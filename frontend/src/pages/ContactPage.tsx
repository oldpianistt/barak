import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

export function ContactPage() {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.email'),
      value: t('contact.emailValue'),
      href: `mailto:${t('contact.emailValue')}`,
    },
    {
      icon: Phone,
      label: t('contact.phone'),
      value: t('contact.phoneValue'),
      href: `tel:${t('contact.phoneValue').replace(/\s/g, '')}`,
    },
    {
      icon: MapPin,
      label: t('contact.address'),
      value: t('contact.addressValue'),
      href: `https://maps.google.com/?q=${encodeURIComponent(t('contact.addressValue'))}`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-6 block"
            >
              {t('contact.getInTouch')}
            </motion.span>
            <h1 className="text-5xl md:text-7xl tracking-[0.15em] uppercase font-light mb-8">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-neutral-600 tracking-wide max-w-2xl mx-auto">
              {t('contact.reachOut')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target={info.icon === MapPin ? '_blank' : undefined}
                    rel={info.icon === MapPin ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="bg-white p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-500 flex items-start gap-6 group"
                  >
                    <motion.div
                      whileHover={{ rotate: 5 }}
                      className="w-16 h-16 bg-neutral-900 flex items-center justify-center flex-shrink-0 group-hover:bg-neutral-800 transition-colors duration-300"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">
                        {info.label}
                      </h3>
                      <p className="text-lg text-neutral-900 group-hover:text-neutral-600 transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}

              {/* Business Hours */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white p-8 shadow-lg shadow-black/5"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-neutral-900 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-4">
                      {t('contact.businessHours')}
                    </h3>
                    <div className="space-y-2 text-neutral-700">
                      <p className="flex justify-between gap-8">
                        <span>{t('contact.mondayFriday')}</span>
                        <span>8:00 AM - 6:00 PM</span>
                      </p>
                      <p className="flex justify-between gap-8">
                        <span>{t('contact.saturday')}</span>
                        <span>9:00 AM - 4:00 PM</span>
                      </p>
                      <p className="flex justify-between gap-8">
                        <span>{t('contact.sunday')}</span>
                        <span>{t('contact.closed')}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Google Maps Embed */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative h-[600px] bg-neutral-100 overflow-hidden shadow-2xl shadow-black/10"
            >
              {/* Map Iframe */}
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(t('contact.addressValue'))}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="STL Stone Gallery Location"
                className="absolute inset-0"
              />

              {/* Address overlay card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 shadow-xl">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-neutral-900 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">
                      {t('contact.address')}
                    </h3>
                    <p className="text-lg text-neutral-900 mb-4 leading-relaxed">
                      {t('contact.addressValue')}
                    </p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(t('contact.addressValue'))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2 bg-neutral-900 text-white hover:bg-neutral-800 tracking-[0.15em] uppercase text-xs transition-colors duration-300"
                    >
                      {t('contact.openInMaps')}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-16 bg-gradient-to-br from-neutral-900 to-neutral-800">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl tracking-[0.15em] uppercase font-light text-white mb-6">
              {t('contact.readyToGetStarted').split(' ').slice(0, 3).join(' ')}{' '}
              <span className="italic font-serif">{t('contact.readyToGetStarted').split(' ').slice(3).join(' ')}</span>
            </h2>
            <p className="text-xl text-neutral-300 tracking-wide mb-10 max-w-2xl mx-auto">
              {t('contact.supportProject')}
            </p>
            <motion.a
              href={`mailto:${t('contact.emailValue')}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-12 py-5 bg-white text-neutral-900 hover:bg-neutral-100 tracking-[0.2em] uppercase text-sm transition-colors duration-300 shadow-lg"
            >
              {t('contact.sendEmail')}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
