import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Award, Globe, Heart, Users } from 'lucide-react';

export function AboutPage() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Globe,
      title: t('about.globalHeritage'),
      description: t('about.globalHeritageDesc'),
    },
    {
      icon: Award,
      title: t('about.premiumQuality'),
      description: t('about.premiumQualityDesc'),
    },
    {
      icon: Users,
      title: t('about.expertService'),
      description: t('about.expertServiceDesc'),
    },
    {
      icon: Heart,
      title: t('about.passionDriven'),
      description: t('about.passionDrivenDesc'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
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
              {t('about.ourStory')}
            </motion.span>
            <h1 className="text-5xl md:text-7xl tracking-[0.15em] uppercase font-light mb-8">
              {t('about.title').split('–')[0]}
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-neutral-900 to-transparent mx-auto" />
          </motion.div>

          {/* Content */}
          <div className="space-y-8 text-lg text-neutral-700 leading-relaxed max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl tracking-wide"
            >
              {t('about.paragraph1')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="tracking-wide"
            >
              {t('about.paragraph2')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="tracking-wide"
            >
              {t('about.paragraph3')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="tracking-wide"
            >
              {t('about.paragraph4')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 lg:px-16 bg-gradient-to-b from-white to-neutral-50">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl tracking-[0.15em] uppercase font-light mb-6">
              {t('about.whyChooseUs').split(' ').slice(0, 2).join(' ')}{' '}
              <span className="italic font-serif">{t('about.whyChooseUs').split(' ')[2]}</span>
            </h2>
            <p className="text-neutral-600 tracking-wide max-w-2xl mx-auto">
              {t('about.whyChooseDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-shadow duration-500 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 bg-neutral-900 flex items-center justify-center mb-6 group-hover:bg-neutral-800 transition-colors duration-300"
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl tracking-wide uppercase mb-3 group-hover:text-neutral-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center bg-gradient-to-br from-neutral-900 to-neutral-800 p-16 shadow-2xl shadow-black/20 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl tracking-[0.15em] uppercase font-light text-white mb-6">
                {t('about.startYourProject').split(' ').slice(0, 2).join(' ')}{' '}
                <span className="italic font-serif">{t('about.startYourProject').split(' ')[2]}</span>
              </h2>
              <p className="text-xl text-neutral-300 tracking-wide mb-10 max-w-2xl mx-auto">
                {t('about.startProjectDesc')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <motion.a
                  href="/products"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-white text-neutral-900 hover:bg-neutral-100 tracking-[0.2em] uppercase text-sm transition-colors duration-300 shadow-lg"
                >
                  {t('about.exploreCollection')}
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 border-2 border-white text-white hover:bg-white hover:text-neutral-900 tracking-[0.2em] uppercase text-sm transition-colors duration-300"
                >
                  {t('about.contactUs')}
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications / Partners Section */}
      <section className="py-20 px-6 lg:px-16 bg-gradient-to-b from-white to-neutral-50 relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-[1200px] mx-auto relative">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >

            <h3 className="text-3xl md:text-4xl tracking-[0.15em] uppercase font-light text-neutral-800">
              {t('about certifications') || 'Certifications & Standards'}
            </h3>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-neutral-400 to-transparent mx-auto mt-4" />
          </motion.div>

          {/* Logos */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-16 md:gap-28"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="w-36 h-36 md:w-44 md:h-44 p-4 bg-white rounded-lg shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-shadow duration-300 flex items-center justify-center"
            >
              <img src="/1.svg" alt="NSF Certification" className="max-h-full max-w-full object-contain" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="w-36 h-36 md:w-44 md:h-44 p-4 bg-white rounded-lg shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-shadow duration-300 flex items-center justify-center"
            >
              <img src="/2.jpeg" alt="GreenGuard Certification" className="max-h-full max-w-full object-contain" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="w-36 h-36 md:w-44 md:h-44 p-4 bg-white rounded-lg shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-shadow duration-300 flex items-center justify-center"
            >
              <img src="/3.svg" alt="CE Certification" className="max-h-full max-w-full object-contain" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
