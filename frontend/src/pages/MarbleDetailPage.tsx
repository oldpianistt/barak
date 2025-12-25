import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useMarble } from '../hooks/useMarbles';
import { ArrowLeft, Package, Sparkles, MapPin, Layers } from 'lucide-react';

export function MarbleDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: marble, isLoading } = useMarble(id ? parseInt(id) : 0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-neutral-200 border-t-neutral-900 rounded-full"
        />
      </div>
    );
  }

  if (!marble) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-neutral-400 tracking-wide mb-6">Marble not found</p>
          <Link to="/products">
            <button className="px-8 py-3 border border-neutral-300 hover:bg-neutral-50 tracking-[0.2em] uppercase text-sm">
              Back to Gallery
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 mb-12 text-neutral-600 hover:text-neutral-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="tracking-wide text-sm uppercase">{t('common.backToGallery')}</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square overflow-hidden bg-neutral-100 rounded-lg shadow-xl shadow-black/10">
              <img
                src={marble.imageUrl}
                alt={`${marble.title} - ${marble.category || 'Premium'} Marble from ${marble.originCountry || 'Turkey'} - High Quality Premium Stone`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Decorative element */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-neutral-200/50 to-transparent rounded-full blur-2xl -z-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-tr from-neutral-200/50 to-transparent rounded-full blur-2xl -z-10"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Title */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-2 mb-4"
              >
                <Sparkles className="w-5 h-5 text-neutral-400" />
                <span className="text-xs tracking-[0.3em] uppercase text-neutral-500">Premium Selection</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl tracking-[0.1em] uppercase font-light mb-6">
                {marble.title}
              </h1>

              {marble.description && (
                <p className="text-lg text-neutral-700 leading-relaxed tracking-wide">
                  {marble.description}
                </p>
              )}
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t-2 border-neutral-200">
              {marble.category && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Layers className="w-4 h-4" />
                    <p className="text-xs font-medium uppercase tracking-wide">
                      {t('marble.category')}
                    </p>
                  </div>
                  <p className="text-lg text-neutral-900">{marble.category}</p>
                </motion.div>
              )}

              {marble.colorTone && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Sparkles className="w-4 h-4" />
                    <p className="text-xs font-medium uppercase tracking-wide">
                      {t('marble.colorTone')}
                    </p>
                  </div>
                  <p className="text-lg text-neutral-900">{marble.colorTone}</p>
                </motion.div>
              )}

              {marble.surfaceFinish && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Layers className="w-4 h-4" />
                    <p className="text-xs font-medium uppercase tracking-wide">
                      {t('marble.surfaceFinish')}
                    </p>
                  </div>
                  <p className="text-lg text-neutral-900">{marble.surfaceFinish}</p>
                </motion.div>
              )}

              {marble.originCountry && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 text-neutral-500">
                    <MapPin className="w-4 h-4" />
                    <p className="text-xs font-medium uppercase tracking-wide">
                      {t('marble.originCountry')}
                    </p>
                  </div>
                  <p className="text-lg text-neutral-900">{marble.originCountry}</p>
                </motion.div>
              )}

              {marble.technicalSpecs?.density && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Package className="w-4 h-4" />
                    <p className="text-xs font-medium uppercase tracking-wide">
                      {t('marble.density')}
                    </p>
                  </div>
                  <p className="text-lg text-neutral-900">{marble.technicalSpecs.density}</p>
                </motion.div>
              )}

              {marble.technicalSpecs?.waterAbsorption && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Sparkles className="w-4 h-4" />
                    <p className="text-xs font-medium uppercase tracking-wide">
                      {t('marble.waterAbsorption')}
                    </p>
                  </div>
                  <p className="text-lg text-neutral-900">{marble.technicalSpecs.waterAbsorption}</p>
                </motion.div>
              )}

              {marble.technicalSpecs?.compressiveStrength && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Layers className="w-4 h-4" />
                    <p className="text-xs font-medium uppercase tracking-wide">
                      {t('marble.compressiveStrength')}
                    </p>
                  </div>
                  <p className="text-lg text-neutral-900">{marble.technicalSpecs.compressiveStrength}</p>
                </motion.div>
              )}

              {marble.technicalSpecs?.flexuralStrength && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Sparkles className="w-4 h-4" />
                    <p className="text-xs font-medium uppercase tracking-wide">
                      {t('marble.flexuralStrength')}
                    </p>
                  </div>
                  <p className="text-lg text-neutral-900">{marble.technicalSpecs.flexuralStrength}</p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-neutral-500">
                  <Package className="w-4 h-4" />
                  <p className="text-xs font-medium uppercase tracking-wide">
                    {t('common.stock')}
                  </p>
                </div>
                <p className="text-lg text-neutral-900">
                  {marble.stockQuantity} <span className="text-sm text-neutral-500">{t('common.units')}</span>
                </p>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="pt-8 border-t border-neutral-200"
            >
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-12 py-5 bg-neutral-900 text-white hover:bg-neutral-800 tracking-[0.2em] uppercase text-sm transition-colors duration-300 shadow-lg shadow-black/10"
                >
                  Inquire About This Piece
                </motion.button>
              </Link>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="p-6 bg-neutral-50 border border-neutral-200"
            >
              <p className="text-sm text-neutral-600 leading-relaxed tracking-wide">
                Each piece of premium stone is unique. Colors, patterns, and veining may vary from the image shown.
                Contact us for current availability and detailed product information.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
