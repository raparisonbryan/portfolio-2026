import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@components/button/Button';
import styles from './ContactForm.module.scss';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Une erreur est survenue.');
        setTimeout(() => setStatus('idle'), 4000);
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setErrorMessage('Impossible de joindre le serveur. Réessayez plus tard.');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.row}>
        <motion.div
          className={styles.field}
          animate={focusedField === 'name' ? 'focus' : 'blur'}
        >
          <label htmlFor="name" className={styles.label}>
            Nom complet
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            className={styles.input}
            placeholder="John Doe"
            required
          />
        </motion.div>

        <motion.div
          className={styles.field}
          animate={focusedField === 'email' ? 'focus' : 'blur'}
        >
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className={styles.input}
            placeholder="john@example.com"
            required
          />
        </motion.div>
      </div>

      <motion.div
        className={styles.field}
        animate={focusedField === 'subject' ? 'focus' : 'blur'}
      >
        <label htmlFor="subject" className={styles.label}>
          Sujet
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onFocus={() => setFocusedField('subject')}
          onBlur={() => setFocusedField(null)}
          className={styles.input}
          placeholder="Projet de collaboration"
          required
        />
      </motion.div>

      <motion.div
        className={styles.field}
        animate={focusedField === 'message' ? 'focus' : 'blur'}
      >
        <label htmlFor="message" className={styles.label}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          className={styles.textarea}
          placeholder="Décrivez votre projet ou votre demande..."
          rows={6}
          required
        />
      </motion.div>

      {status === 'error' && errorMessage && (
        <motion.p
          className={styles.errorMessage}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
        >
          {errorMessage}
        </motion.p>
      )}

      <div className={styles.actions}>
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'submitting'}
          className={styles.submitButton}
        >
          <AnimatePresence mode="wait">
            {status === 'submitting' ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.loading}
              >
                <span className={styles.spinner} />
                Envoi en cours...
              </motion.span>
            ) : status === 'success' ? (
              <motion.span
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Message envoyé !
              </motion.span>
            ) : (
              <motion.span
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Envoyer le message
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </motion.form>
  );
}

