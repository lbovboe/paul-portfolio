import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Copy, Check, Send } from 'lucide-react';

interface ContactMethod {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  copyValue?: string;
}

const contactMethods: ContactMethod[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'caijianbopaul@gmail.com',
    href: 'mailto:caijianbopaul@gmail.com',
    copyValue: 'caijianbopaul@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+65 8719 9362',
    href: 'tel:+6587199362',
    copyValue: '+6587199362',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Singapore · Remote Available',
    href: '',
  },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/lbovboe' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/jianbo-cai-4540242a0/' },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/6587199362',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.363.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.004 2.003c-5.522 0-9.997 4.475-9.997 9.997 0 1.762.464 3.484 1.345 4.997L2.003 22l5.09-1.334c1.462.799 3.09 1.237 4.91 1.237 5.522 0 9.997-4.475 9.997-9.997 0-5.522-4.475-9.997-9.997-9.997z" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: 'https://t.me/LboVboE',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
];

const ContactSection = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (e: React.MouseEvent, value: string, field: string) => {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField((current) => (current === field ? null : current)), 2000);
  };

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-20">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/30 bg-blue-500/10 px-4 py-2 backdrop-blur-sm">
            <Send className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-white">Open to New Opportunities</span>
          </div>
          <h2 className="mb-6 hidden bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 bg-clip-text text-6xl font-bold text-transparent dark:from-cyan-200 dark:via-blue-200 dark:to-blue-100 md:block">
            Let&apos;s Connect
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Have a project in mind or just want to say hi? Reach out through any of the channels below.
          </p>
        </div>

        {/* Contact methods */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {contactMethods.map((method, index) => {
            const isCopied = copiedField === method.label;
            const Wrapper = method.href ? 'a' : 'div';

            return (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              >
                <Wrapper
                  {...(method.href ? { href: method.href } : {})}
                  className="group relative flex h-full flex-col items-center gap-3 rounded-2xl border border-blue-200/50 bg-white/70 p-6 text-center shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/20 dark:border-slate-700/50 dark:bg-slate-900/70 dark:hover:shadow-cyan-500/20"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-transform duration-300 group-hover:scale-110 dark:bg-slate-800 dark:text-cyan-300">
                    <method.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      {method.label}
                    </p>
                    <p className="mt-1 break-words text-base font-semibold text-slate-800 dark:text-white">
                      {method.value}
                    </p>
                  </div>

                  {method.copyValue && (
                    <button
                      type="button"
                      aria-label={`Copy ${method.label.toLowerCase()}`}
                      onClick={(e) => handleCopy(e, method.copyValue!, method.label)}
                      className="absolute right-3 top-3 rounded-full p-2 text-slate-400 opacity-0 transition-all duration-200 hover:bg-blue-100 hover:text-blue-600 group-hover:opacity-100 dark:hover:bg-slate-800 dark:hover:text-cyan-300"
                    >
                      {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  )}
                </Wrapper>
              </motion.div>
            );
          })}
        </div>

        {/* Social links */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-blue-200/50 bg-white/70 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/20 dark:border-slate-700/50 dark:bg-slate-900/70 dark:hover:shadow-cyan-500/20"
            >
              <social.icon className="h-6 w-6 text-slate-600 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-600 dark:text-slate-300 dark:group-hover:text-cyan-300" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{social.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
