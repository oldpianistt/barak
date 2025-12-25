import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative overflow-hidden bg-neutral-900">
      {/* Modern dark marble-inspired background */}
      <div className="absolute inset-0">
        {/* Dark neutral grey base with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-stone-900" />

        {/* Subtle modern marble veining - elegant and restrained */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(135deg, transparent 35%, rgba(255,255,255,0.15) 38%, rgba(255,255,255,0.08) 40%, transparent 43%),
              linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.1) 50%, transparent 52%),
              linear-gradient(165deg, transparent 62%, rgba(255,255,255,0.12) 64%, transparent 67%)
            `,
            backgroundSize: '500px 500px, 400px 400px, 450px 450px',
            backgroundPosition: '0 0, 200px 200px, 100px 50px'
          }}
        />

        {/* Modern geometric overlay pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.08) 50%, transparent 51%),
              linear-gradient(0deg, transparent 49%, rgba(255,255,255,0.05) 50%, transparent 51%)
            `,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Fine grain texture for premium feel */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        />

        {/* Top accent border - subtle white line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-400/20 to-transparent" />

        {/* Subtle top glow for depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-20 bg-gradient-to-b from-neutral-700/10 to-transparent blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 flex items-center justify-center rounded bg-gradient-to-br from-neutral-800 to-stone-800 border border-neutral-700/30 shadow-xl">
                <img
                  src="/logo2.png"
                  alt="STL Stone Gallery"
                  className="w-10 h-10 object-contain brightness-110"
                />
              </div>
              <div>
                <h3 className="tracking-[0.25em] uppercase text-sm font-light text-neutral-100">
                  STL Stone
                </h3>
                <p className="tracking-[0.2em] uppercase text-xs text-neutral-400 mt-1">
                  Gallery
                </p>
              </div>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="tracking-[0.25em] uppercase text-xs font-medium text-neutral-200 mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-neutral-400/30" />
              {t('footer.quickLinks')}
            </h3>
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm text-neutral-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block w-fit"
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/products"
                className="text-sm text-neutral-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block w-fit"
              >
                {t('nav.gallery')}
              </Link>
              <Link
                to="/about"
                className="text-sm text-neutral-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block w-fit"
              >
                {t('nav.about')}
              </Link>
              <Link
                to="/contact"
                className="text-sm text-neutral-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block w-fit"
              >
                {t('nav.contact')}
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="tracking-[0.25em] uppercase text-xs font-medium text-neutral-200 mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-neutral-400/30" />
              {t('contact.title')}
            </h3>
            <div className="flex flex-col gap-3 text-sm text-neutral-300">
              <a
                href={`mailto:${t('contact.emailValue')}`}
                className="hover:text-white transition-colors duration-300"
              >
                {t('contact.emailValue')}
              </a>
              <a
                href={`tel:${t('contact.phoneValue')}`}
                className="hover:text-white transition-colors duration-300"
              >
                {t('contact.phoneValue')}
              </a>
              <p className="leading-relaxed text-neutral-400">
                {t('contact.addressValue')}
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="relative pt-8 border-t border-neutral-800/50">
          {/* Decorative top accent */}
          <div className="absolute top-0 left-0 w-48 h-[1px] bg-gradient-to-r from-neutral-400/30 to-transparent" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-400 tracking-wide">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>

            {/* Optional: Social links or additional info */}
            <div className="flex items-center gap-4 text-xs text-neutral-500">
              <span className="tracking-wider">Premium Stone</span>
              <span className="w-1 h-1 rounded-full bg-neutral-600" />
              <span className="tracking-wider">Luxury Marble Gallery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-800/50 to-transparent" />
    </footer>
  );
}
