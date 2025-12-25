import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useHeroSlides } from '../hooks/useHeroSlides';
import { useMarbles } from '../hooks/useMarbles';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Marble } from '../types/marble';

// MarbleCard Component
function MarbleCard({ marble }: { marble: Marble }) {
  return (
    <Link
      to={`/products/${marble.id}`}
      className="group block bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={marble.imageUrl || 'https://images.unsplash.com/photo-1611348586804-61bf6c080437'}
          alt={marble.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-8">
        <h3 className="text-xl tracking-[0.15em] uppercase mb-3 group-hover:text-neutral-600 transition-colors">
          {marble.title}
        </h3>
        <p className="text-neutral-500 text-sm tracking-wide line-clamp-2 mb-4">
          {marble.description}
        </p>
        <div className="flex items-center gap-2 text-sm tracking-wide text-neutral-900">
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

export function HomePage() {
  const { t } = useTranslation();
  const { data: heroSlides } = useHeroSlides();
  const { data: marblesData, isLoading: marblesLoading, error } = useMarbles(0, 6, true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    if (heroSlides && heroSlides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide: number) => (prevSlide + 1) % heroSlides.length);
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [heroSlides]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-neutral-50 to-white">

      {/* Hero Section with Background Marble Slideshow */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image Slideshow */}
        <div className="absolute inset-0 z-0">
          {(heroSlides || []).map((slide, index) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{
                opacity: index === currentSlide ? 1 : 0,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${slide.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          ))}

          {/* Transparent White Overlay - very light for maximum image visibility */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />

          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/15 to-white/50" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center relative z-10 px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-6 h-6 text-neutral-400" />
            <span className="tracking-[0.3em] uppercase text-xs text-neutral-500">{t('home.premiumCollection')}</span>
            <Sparkles className="w-6 h-6 text-neutral-400" />
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl tracking-[0.2em] uppercase font-light mb-6">
            {t('home.brandName').split(' ')[0]}{' '}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="italic font-serif block mt-4"
            >
              {t('home.brandName').split(' ').slice(1).join(' ')}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl text-neutral-600 tracking-wide mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {t('home.tagline')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-12 py-5 bg-neutral-900 text-white hover:bg-neutral-800 tracking-[0.2em] uppercase text-sm transition-colors duration-300 shadow-lg shadow-black/10 flex items-center gap-3"
              >
                {t('home.exploreCollection')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white tracking-[0.2em] uppercase text-sm transition-colors duration-300"
              >
                {t('home.aboutUs')}
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400"
        >
          <span className="text-xs tracking-wide uppercase">{t('home.scroll')}</span>
          <div className="w-px h-12 bg-gradient-to-b from-neutral-400 to-transparent" />
        </motion.div>
      </section>

      {/* Featured Marbles Section */}
      <section className="py-32 px-6 lg:px-16 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl tracking-[0.2em] uppercase font-light mb-6">
            {t('home.featuredProducts')}
          </h2>
          <p className="text-neutral-600 tracking-wide text-lg max-w-2xl mx-auto">
            {t('home.featuredDescription')}
          </p>
        </motion.div>

        {marblesLoading ? (
          <div className="text-center py-32">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-neutral-200 border-t-neutral-900 rounded-full mx-auto"
            />
            <p className="mt-6 text-neutral-500 tracking-wide">{t('common.loading')}</p>
          </div>
        ) : error ? (
          <div className="text-center py-32">
            <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 p-8 rounded">
              <h3 className="text-2xl tracking-wide mb-4 text-red-800">{t('home.unableToConnect')}</h3>
              <p className="text-red-600 mb-6">
                Please ensure your Spring Boot backend is running at:<br />
                <code className="bg-red-100 px-3 py-1 rounded text-sm mt-2 inline-block">
                  {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api/admin'}
                </code>
              </p>
              <div className="text-left bg-white p-6 rounded text-sm text-neutral-700 space-y-2">
                <p><strong>Quick Start:</strong></p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>Make sure your Spring Boot application is running</li>
                  <li>Check that it's accessible at port 8081</li>
                  <li>Verify CORS is configured to allow localhost:3000</li>
                  <li>Refresh this page once the backend is running</li>
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(marblesData?.content || []).map((marble, index) => (
              <motion.div
                key={marble.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <MarbleCard marble={marble} />
              </motion.div>
            ))}
          </div>
        )}

        {marblesData?.content && marblesData.content.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-4 border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white tracking-[0.2em] uppercase text-sm transition-colors duration-300 inline-flex items-center gap-3"
              >
                {t('home.viewFullCollection')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-16 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl tracking-[0.15em] uppercase font-light mb-6">
              {t('home.elevateYourSpace').split(' ')[0]} {t('home.elevateYourSpace').split(' ')[1]}{' '}
              <span className="italic font-serif">{t('home.space')}</span>
            </h2>
            <p className="text-xl text-neutral-300 tracking-wide mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('home.transformVision')}
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-white text-neutral-900 hover:bg-neutral-100 tracking-[0.2em] uppercase text-sm transition-colors duration-300 shadow-lg"
              >
                {t('contact.getInTouch')}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}