import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import type { Marble } from '../types/marble';

interface MarbleCardProps {
  marble: Marble;
}

export function MarbleCard({ marble }: MarbleCardProps) {
  const { t } = useTranslation();

  return (
    <Link to={`/products/${marble.id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-shadow duration-500 group"
      >
        <div className="aspect-square overflow-hidden relative">
          <img
            src={marble.imageUrl || 'https://images.unsplash.com/photo-1611348586804-61bf6c080437'}
            alt={`${marble.title} - Premium ${marble.category || 'Natural'} Marble from ${marble.originCountry || 'Turkey'}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-6 space-y-3">
          <h3 className="tracking-wide uppercase text-sm truncate group-hover:text-neutral-600 transition-colors">
            {marble.title}
          </h3>

          {marble.colorTone && (
            <p className="text-neutral-500 text-xs tracking-wide">{marble.colorTone}</p>
          )}

          {marble.originCountry && (
            <p className="text-xs text-neutral-400">
              {t('marble.originCountry')}: {marble.originCountry}
            </p>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
            <p className="text-sm text-neutral-600">
              {t('common.stock')}: <span className="font-medium">{marble.stockQuantity}</span> {t('common.units')}
            </p>
            <span className="text-xs uppercase tracking-wide text-neutral-900 group-hover:translate-x-1 transition-transform duration-300">
              {t('common.viewDetails')} →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}