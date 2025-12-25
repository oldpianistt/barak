import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem('language', lng);
    } catch {
      // localStorage not available, ignore
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="STL Stone Gallery - Premium Marble and Stone Supplier"
              className="h-42 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              to="/"
              className="tracking-[0.2em] uppercase text-xs hover:text-neutral-600 transition-colors duration-300"
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/products"
              className="tracking-[0.2em] uppercase text-xs hover:text-neutral-600 transition-colors duration-300"
            >
              {t('nav.gallery')}
            </Link>
            <Link
              to="/about"
              className="tracking-[0.2em] uppercase text-xs hover:text-neutral-600 transition-colors duration-300"
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/contact"
              className="tracking-[0.2em] uppercase text-xs hover:text-neutral-600 transition-colors duration-300"
            >
              {t('nav.contact')}
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-2 pl-4 border-l border-neutral-300">
              <Globe className="w-4 h-4 text-neutral-400" />
              <button
                onClick={() => changeLanguage('en')}
                className={`text-xs tracking-wide transition-all duration-300 ${i18n.language === 'en' ? 'font-bold text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
                  }`}
              >
                EN
              </button>
              <span className="text-neutral-300">|</span>
              <button
                onClick={() => changeLanguage('es')}
                className={`text-xs tracking-wide transition-all duration-300 ${i18n.language === 'es' ? 'font-bold text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
                  }`}
              >
                ES
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-neutral-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-8 border-t border-neutral-200 flex flex-col gap-6 overflow-hidden"
            >
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="tracking-[0.2em] uppercase text-xs hover:text-neutral-600"
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="tracking-[0.2em] uppercase text-xs hover:text-neutral-600"
              >
                {t('nav.gallery')}
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="tracking-[0.2em] uppercase text-xs hover:text-neutral-600"
              >
                {t('nav.about')}
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="tracking-[0.2em] uppercase text-xs hover:text-neutral-600"
              >
                {t('nav.contact')}
              </Link>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="tracking-[0.2em] uppercase text-xs hover:text-neutral-600"
              >
                {t('nav.admin')}
              </Link>

              <div className="flex items-center gap-4 pt-6 border-t border-neutral-200">
                <Globe className="w-4 h-4 text-neutral-400" />
                <button
                  onClick={() => {
                    changeLanguage('en');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xs tracking-wide ${i18n.language === 'en' ? 'font-bold' : 'text-neutral-400'
                    }`}
                >
                  ENGLISH
                </button>
                <span className="text-neutral-300">|</span>
                <button
                  onClick={() => {
                    changeLanguage('es');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xs tracking-wide ${i18n.language === 'es' ? 'font-bold' : 'text-neutral-400'
                    }`}
                >
                  ESPAÑOL
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}