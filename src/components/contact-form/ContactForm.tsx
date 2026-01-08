import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

    // TODO: Remplacer par vraie API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 3000);
  };

  const inputVariants = {
    focus: { scale: 1.01 },
    blur: { scale: 1 },
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
          variants={inputVariants}
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
          variants={inputVariants}
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
        variants={inputVariants}
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
        variants={inputVariants}
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

      <div className={styles.actions}>
        <motion.button
          type="submit"
          className={styles.submitButton}
          disabled={status === 'submitting'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
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
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                ✓ Message envoyé !
              </motion.span>
            ) : (
              <motion.span
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Envoyer le message
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.form>
  );
}

