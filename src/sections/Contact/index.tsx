import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, Check } from 'lucide-react';
import SectionLabel from '../../components/ui/SectionLabel';
import Button from '../../components/ui/Button';
import { GithubIcon, LinkedinIcon, TwitterXIcon } from '../../components/ui/SocialIcons';
import FadeInUp from '../../components/animations/FadeInUp';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { sendContactEmail } from '../../utils/emailjs';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message should be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/Rupesh-Singh-Karki', label: 'Visit GitHub profile' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/rupesh-singh-karki-552226363/', label: 'Visit LinkedIn profile' },
  { icon: TwitterXIcon, href: 'https://x.com/rupesh_singh_k', label: 'Visit X profile' },
  { icon: Mail, href: 'karkisinghrupesh@gmail.com', label: 'Send an email' },
];

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle');
  const reducedMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormState('submitting');
    try {
      await sendContactEmail(data);
      setFormState('success');
      reset();

      // Dynamic confetti import
      if (!reducedMotion) {
        const confetti = (await import('canvas-confetti')).default;
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff2d78', '#00e0ff', '#ff6bac', '#40d8ff'],
        });
      }
    } catch {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 6000);
    }
  };

  const inputStyles: React.CSSProperties = {
    width: '100%',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 'var(--text-base)',
    color: 'var(--text-primary)',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: '12px 16px',
    minHeight: '48px',
    transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
  };

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        padding: 'var(--space-24) 0',
        overflow: 'hidden',
      }}
    >
      <div className="section-ordinal" aria-hidden="true" style={{ top: 'var(--space-8)', right: 'var(--space-8)' }}>
        08
      </div>

      {/* Background circuit SVG */}
      <svg
        aria-hidden="true"
        role="presentation"
        viewBox="0 0 360 400"
        style={{
          position: 'absolute',
          right: '5%',
          top: '20%',
          width: '360px',
          height: '400px',
          pointerEvents: 'none',
          opacity: 0.3,
        }}
      >
        {/* Circuit paths */}
        <path d="M50,50 L150,50 L150,150 L250,150 L250,250" fill="none" stroke="rgba(255,45,120,0.07)" strokeWidth="1">
          <animate attributeName="stroke-dashoffset" from="500" to="0" dur="5s" repeatCount="indefinite" />
        </path>
        <path d="M300,30 L300,130 L200,130 L200,230 L100,230 L100,330" fill="none" stroke="rgba(0,224,255,0.05)" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="400" to="0" dur="7s" repeatCount="indefinite" />
        </path>
        <path d="M30,200 L130,200 L130,300 L230,300 L230,380" fill="none" stroke="rgba(255,45,120,0.06)" strokeWidth="0.5">
          <animate attributeName="stroke-dashoffset" from="600" to="0" dur="6s" repeatCount="indefinite" />
        </path>
        {/* Nodes */}
        {[[150, 50], [150, 150], [250, 150], [250, 250], [300, 130], [200, 130], [200, 230], [100, 230], [130, 200], [130, 300], [230, 300]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill={i % 2 === 0 ? 'rgba(255,45,120,0.1)' : 'rgba(0,224,255,0.08)'} />
        ))}
      </svg>

      <div className="section-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-16)',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Left — Info */}
          <FadeInUp>
            <div>
              <SectionLabel number="08" label="CONTACT" />
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 'var(--text-4xl)',
                  lineHeight: 1.15,
                  marginBottom: 'var(--space-6)',
                }}
              >
                <span style={{ display: 'block', color: 'var(--text-primary)' }}>Let's build</span>
                <span style={{ display: 'block', color: 'var(--text-primary)' }}>something</span>
                <span className="gradient-text-pink" style={{ display: 'block' }}>remarkable.</span>
              </h2>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'var(--text-base)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  marginBottom: 'var(--space-8)',
                  maxWidth: '45ch',
                }}
              >
                Have a project in mind or just want to chat? I'm always open
                to discussing new opportunities, interesting ideas, or
                collaboration on ambitious projects.
              </p>

              {/* Contact info */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-8)',
                }}
              >
                <a
                  href="mailto:karkisinghrupesh@gmail.com"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    color: 'var(--cyan-500)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'var(--text-base)',
                    textDecoration: 'none',
                    minHeight: '44px',
                    transition: 'color var(--dur-fast) ease',
                  }}
                >
                  <Mail size={18} style={{ color: 'var(--pink-500)' }} aria-hidden="true" />
                  karkisinghrupesh@gmail.com
                </a>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    color: 'var(--text-secondary)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'var(--text-base)',
                    minHeight: '44px',
                  }}
                >
                  <MapPin size={18} style={{ color: 'var(--pink-500)' }} aria-hidden="true" />
                  India
                </div>
              </div>

              {/* Social icons */}
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="contact-social"
                    style={{
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'var(--radius-md)',
                      border: '0.5px solid var(--border-subtle)',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'all var(--dur-fast) ease',
                    }}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </a>
                ))}
              </div>

              {/* Open to Work badge */}
              <div
                className="glass-card"
                style={{
                  padding: 'var(--space-3) var(--space-5)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--color-success)',
                    boxShadow: '0 0 8px rgba(0,224,150,0.6)',
                    animation: 'pulse 2s ease-in-out infinite',
                    display: 'inline-block',
                  }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 600,
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-primary)',
                  }}
                >
                  Open to Work
                </span>
              </div>
            </div>
          </FadeInUp>

          {/* Right — Form */}
          <FadeInUp delay={200}>
            <div
              className="glass-card"
              style={{
                padding: 'var(--space-8)',
                border: '0.5px solid var(--border-medium)',
              }}
            >
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={reducedMotion ? {} : { opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reducedMotion ? {} : { opacity: 0, x: -60 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      padding: 'var(--space-8) 0',
                    }}
                  >
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'rgba(255,45,120,0.1)',
                        border: '2px solid var(--pink-500)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 'var(--space-6)',
                        boxShadow: 'var(--pink-glow-sm)',
                      }}
                    >
                      <Check size={28} style={{ color: 'var(--pink-500)' }} aria-hidden="true" />
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: 'var(--text-2xl)',
                        color: 'var(--text-primary)',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      Message sent!
                    </h3>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 'var(--text-base)',
                        color: 'var(--text-secondary)',
                        maxWidth: '35ch',
                      }}
                    >
                      I'll get back to you within 24 hours. Looking forward to our conversation.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit(onSubmit)}
                    initial={reducedMotion ? {} : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reducedMotion ? {} : { opacity: 0, x: -60 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-5)',
                      pointerEvents: formState === 'submitting' ? 'none' : 'auto',
                    }}
                    noValidate
                  >
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-primary)',
                          marginBottom: 'var(--space-2)',
                          display: 'block',
                        }}
                      >
                        Name <span style={{ color: 'var(--pink-500)' }} aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="John Doe"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        style={{
                          ...inputStyles,
                          borderColor: errors.name ? 'var(--color-error)' : undefined,
                          boxShadow: errors.name ? '0 0 0 3px rgba(255,77,77,0.25)' : undefined,
                        }}
                        className="contact-input"
                        {...register('name')}
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          role="alert"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-error)',
                            marginTop: 'var(--space-1)',
                          }}
                        >
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-primary)',
                          marginBottom: 'var(--space-2)',
                          display: 'block',
                        }}
                      >
                        Email <span style={{ color: 'var(--pink-500)' }} aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="john@example.com"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        style={{
                          ...inputStyles,
                          borderColor: errors.email ? 'var(--color-error)' : undefined,
                          boxShadow: errors.email ? '0 0 0 3px rgba(255,77,77,0.25)' : undefined,
                        }}
                        className="contact-input"
                        {...register('email')}
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          role="alert"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-error)',
                            marginTop: 'var(--space-1)',
                          }}
                        >
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="contact-subject"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-primary)',
                          marginBottom: 'var(--space-2)',
                          display: 'block',
                        }}
                      >
                        Subject <span style={{ color: 'var(--pink-500)' }} aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        placeholder="Project collaboration"
                        aria-required="true"
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                        style={{
                          ...inputStyles,
                          borderColor: errors.subject ? 'var(--color-error)' : undefined,
                          boxShadow: errors.subject ? '0 0 0 3px rgba(255,77,77,0.25)' : undefined,
                        }}
                        className="contact-input"
                        {...register('subject')}
                      />
                      {errors.subject && (
                        <p
                          id="subject-error"
                          role="alert"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-error)',
                            marginTop: 'var(--space-1)',
                          }}
                        >
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-primary)',
                          marginBottom: 'var(--space-2)',
                          display: 'block',
                        }}
                      >
                        Message <span style={{ color: 'var(--pink-500)' }} aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        placeholder="Tell me about your project..."
                        rows={5}
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        style={{
                          ...inputStyles,
                          resize: 'vertical',
                          minHeight: '120px',
                          borderColor: errors.message ? 'var(--color-error)' : undefined,
                          boxShadow: errors.message ? '0 0 0 3px rgba(255,77,77,0.25)' : undefined,
                        }}
                        className="contact-input"
                        {...register('message')}
                      />
                      {errors.message && (
                        <p
                          id="message-error"
                          role="alert"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-error)',
                            marginTop: 'var(--space-1)',
                          }}
                        >
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      variant="primary"
                      loading={formState === 'submitting'}
                      style={{ width: '100%' }}
                    >
                      <Send size={16} aria-hidden="true" />
                      {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                    </Button>

                    {/* Error toast (inline for simplicity) */}
                    {formState === 'error' && (
                      <div
                        role="alert"
                        aria-live="assertive"
                        style={{
                          background: 'rgba(255,77,77,0.08)',
                          border: '1px solid rgba(255,77,77,0.3)',
                          borderRadius: 'var(--radius-md)',
                          padding: 'var(--space-3) var(--space-4)',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-error)',
                        }}
                      >
                        Something went wrong. Please try again.
                      </div>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeInUp>
        </div>
      </div>

      <style>{`
        .contact-input::placeholder {
          color: var(--text-tertiary);
        }
        .contact-input:hover {
          border-color: var(--border-medium);
        }
        .contact-input:focus {
          outline: none;
          border-color: var(--pink-500);
          box-shadow: var(--focus-ring);
        }
        .contact-social:hover {
          border-color: var(--border-medium) !important;
          box-shadow: var(--pink-glow-sm);
          color: var(--text-primary) !important;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        @media (max-width: 1023px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
