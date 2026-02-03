import type { APIRoute } from "astro";
import { Resend } from "resend";

const requiredEnv = ["RESEND_API_KEY", "CONTACT_EMAIL", "RESEND_FROM_EMAIL"] as const;

function getEnv() {
  const env: Record<string, string> = {};
  for (const key of requiredEnv) {
    const value = import.meta.env[key];
    if (!value || typeof value !== "string") {
      throw new Error(`Variable d'environnement manquante: ${key}`);
    }
    env[key] = value;
  }
  return env as Record<(typeof requiredEnv)[number], string>;
}

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("content-type")?.includes("application/json") === false) {
    return new Response(
      JSON.stringify({ error: "Content-Type doit être application/json" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Corps de requête JSON invalide" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { name, email, subject, message } = body;
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return new Response(
      JSON.stringify({ error: "Tous les champs sont requis" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const trimmed = {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
  };

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(trimmed.email)) {
    return new Response(
      JSON.stringify({ error: "Adresse email invalide" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  let env: Record<(typeof requiredEnv)[number], string>;
  try {
    env = getEnv();
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Configuration Resend manquante";
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const resend = new Resend(env.RESEND_API_KEY);

  const text = [
    `Nom: ${trimmed.name}`,
    `Email: ${trimmed.email}`,
    ``,
    `Message:`,
    trimmed.message,
  ].join("\n");

  const html = [
    `<p><strong>Nom:</strong> ${escapeHtml(trimmed.name)}</p>`,
    `<p><strong>Email:</strong> <a href="mailto:${escapeHtml(trimmed.email)}">${escapeHtml(trimmed.email)}</a></p>`,
    `<p><strong>Sujet:</strong> ${escapeHtml(trimmed.subject)}</p>`,
    `<hr>`,
    `<p>${escapeHtml(trimmed.message).replace(/\n/g, "<br>")}</p>`,
  ].join("\n");

  const { data, error } = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: env.CONTACT_EMAIL,
    replyTo: trimmed.email,
    subject: `[Portfolio] ${trimmed.subject}`,
    text,
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    return new Response(
      JSON.stringify({ error: "Échec de l'envoi du message. Réessayez plus tard." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ success: true, id: data?.id }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
