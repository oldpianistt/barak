import { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useMarbles } from '../hooks/useMarbles';
import { MarbleCard } from '../components/MarbleCard';
import { ChevronLeft, ChevronRight, Grid3x3, LayoutGrid } from 'lucide-react';

export function GalleryPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [gridSize, setGridSize] = useState<3 | 4>(4);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { data, isLoading, error } = useMarbles(page, 100, true); // Fetch all marbles for filtering

  // Extract unique categories from marbles
  const categories = ['all', ...Array.from(new Set(
    (data?.content || []).map(m => m.category).filter((c): c is string => !!c)
  ))];

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 lg:px-16 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-5xl md:text-7xl tracking-[0.15em] uppercase font-light mb-4">
              {t('gallery.title')}
            </h1>
            <p className="text-neutral-600 tracking-wide">
              {data?.totalElements || 0} premium marble pieces
            </p>
          </div>

          {/* Grid Size Toggle */}
          <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded">
            <button
              onClick={() => setGridSize(3)}
              className={`p-3 rounded transition-colors duration-300 ${gridSize === 3 ? 'bg-white shadow-md' : 'hover:bg-neutral-200'
                }`}
              title="3 columns"
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setGridSize(4)}
              className={`p-3 rounded transition-colors duration-300 ${gridSize === 4 ? 'bg-white shadow-md' : 'hover:bg-neutral-200'
                }`}
              title="4 columns"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 uppercase tracking-[0.2em] text-sm transition-all duration-300 ${selectedCategory === category
                ? 'bg-neutral-900 text-white shadow-lg'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
            >
              {category === 'all' ? 'Tümü' : category}
            </button>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-neutral-900 via-neutral-300 to-transparent" />
      </motion.div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-32">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-neutral-200 border-t-neutral-900 rounded-full mx-auto"
          />
          <p className="mt-6 text-neutral-500 tracking-wide">{t('common.loading')}</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-32">
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 p-8 rounded">
            <h3 className="text-2xl tracking-wide mb-4 text-red-800">{t('gallery.backendError')}</h3>
            <p className="text-red-600">
              Cannot connect to the server. Please ensure your backend is running.
            </p>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {!isLoading && !error && data && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`grid grid-cols-1 md:grid-cols-2 ${gridSize === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
              } gap-8 mb-16`}
          >
            {(data?.content || [])
              .filter(marble => selectedCategory === 'all' || marble.category === selectedCategory)
              .map((marble, index) => (
                <motion.div
                  key={marble.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <MarbleCard marble={marble} />
                </motion.div>
              ))}
          </motion.div>

          {/* Empty State */}
          {data?.content && data.content.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <p className="text-2xl text-neutral-400 tracking-wide">{t('gallery.noResults')}</p>
            </motion.div>
          )}

          {/* Pagination */}
          {data.totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-neutral-200"
            >
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="group px-8 py-4 border border-neutral-300 hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors duration-300 tracking-[0.2em] uppercase text-sm flex items-center gap-3"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                {t('gallery.previous')}
              </button>

              <div className="flex items-center gap-3">
                {Array.from({ length: Math.min(data.totalPages, 5) }, (_, i) => {
                  let pageNum = i;

                  if (data.totalPages > 5) {
                    if (page < 3) {
                      pageNum = i;
                    } else if (page >= data.totalPages - 3) {
                      pageNum = data.totalPages - 5 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-12 h-12 rounded transition-all duration-300 tracking-wide ${page === pageNum
                        ? 'bg-neutral-900 text-white shadow-lg scale-110'
                        : 'border border-neutral-300 hover:bg-neutral-100'
                        }`}
                    >
                      {pageNum + 1}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setPage(p => p + 1)}
                disabled={data.last}
                className="group px-8 py-4 border border-neutral-300 hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors duration-300 tracking-[0.2em] uppercase text-sm flex items-center gap-3"
              >
                {t('gallery.next')}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          )}

          {/* Page Info */}
          {data.totalPages > 1 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-6 text-sm text-neutral-500 tracking-wide"
            >
              Page {page + 1} of {data.totalPages}
            </motion.p>
          )}
        </>
      )}
    </div>
  );
}