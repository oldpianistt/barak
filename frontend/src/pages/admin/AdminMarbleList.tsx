import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useMarbles, useDeleteMarble } from '../../hooks/useMarbles';
import { Search, Plus, Edit2, Trash2, LayoutList, LayoutGrid, Eye, EyeOff } from 'lucide-react';

export function AdminMarbleList() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const { data, isLoading, error } = useMarbles(0, 100);
  const deleteMutation = useDeleteMarble();

  const filteredMarbles = (data?.content || []).filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.colorTone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.originCountry?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: number, title: string) => {
    if (confirm(`${t('admin.deleteConfirm')}\n\n"${title}"`)) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete marble. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white pt-32 pb-16">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-10 mb-12 shadow-lg shadow-black/5"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
            <div>
              <h1 className="text-5xl tracking-[0.1em] uppercase font-light mb-2">
                Marble{' '}
                <span className="italic font-serif">{t('admin.management')}</span>
              </h1>
              <p className="text-neutral-600 tracking-wide">
                {filteredMarbles.length} {t('admin.totalMarbles')}
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/yonetim/hero-slides"
                className="px-6 py-3 bg-neutral-800 hover:bg-neutral-900 text-white tracking-[0.2em] uppercase text-sm transition-colors duration-300 flex items-center gap-2"
              >
                <LayoutGrid className="w-4 h-4" />
                Slaytlar
              </Link>

              <Link
                to="/yonetim/marbles/new"
                className="px-6 py-3 bg-neutral-900 hover:bg-black text-white tracking-[0.2em] uppercase text-sm transition-colors duration-300 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {t('admin.addMarble')}
              </Link>
            </div>
          </div>

          {/* Search & View Toggle */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder={t('admin.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
              />
            </div>
            <div className="flex gap-2 bg-neutral-100 p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-4 transition-colors duration-300 ${viewMode === 'list' ? 'bg-white shadow-md' : 'hover:bg-neutral-200'
                  }`}
                title={t('admin.list')}
              >
                <LayoutList className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-4 transition-colors duration-300 ${viewMode === 'grid' ? 'bg-white shadow-md' : 'hover:bg-neutral-200'
                  }`}
                title={t('admin.grid')}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>
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
        {error && !isLoading && (
          <div className="bg-red-50 border-2 border-red-200 p-12 rounded text-center">
            <h3 className="text-2xl tracking-wide mb-4 text-red-800">Backend Bağlantı Hatası</h3>
            <p className="text-red-600 mb-6">
              API sunucusuna bağlanılamıyor. Lütfen kontrol edin:
            </p>
            <div className="text-left bg-white p-6 rounded text-sm text-neutral-700 space-y-2 max-w-xl mx-auto">
              <p><strong>Sorun Giderme:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Backend sunucusu çalışıyor: <code className="bg-neutral-100 px-2 py-1 rounded">{import.meta.env.VITE_API_BASE_URL}</code></li>
                <li>CORS localhost:3000'den isteklere izin veriyor</li>
                <li>Tüm API endpoint'leri erişilebilir</li>
              </ul>
            </div>
          </div>
        )}

        {/* List View */}
        {!isLoading && viewMode === 'list' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg shadow-black/5 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b-2 border-neutral-200">
                  <tr>
                    <th className="text-left px-8 py-5 uppercase text-xs tracking-wide font-medium">
                      {t('admin.marble')}
                    </th>
                    <th className="text-left px-8 py-5 uppercase text-xs tracking-wide font-medium">
                      {t('admin.color')}
                    </th>
                    <th className="text-left px-8 py-5 uppercase text-xs tracking-wide font-medium">
                      {t('admin.origin')}
                    </th>
                    <th className="text-left px-8 py-5 uppercase text-xs tracking-wide font-medium">
                      {t('common.stock')}
                    </th>
                    <th className="text-left px-8 py-5 uppercase text-xs tracking-wide font-medium">
                      {t('admin.visible')}
                    </th>
                    <th className="text-left px-8 py-5 uppercase text-xs tracking-wide font-medium">
                      {t('admin.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMarbles.map((marble) => (
                    <motion.tr
                      key={marble.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                      className="border-b border-neutral-100 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 bg-neutral-100 overflow-hidden flex-shrink-0">
                            <img
                              src={marble.imageUrl}
                              alt={marble.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="tracking-wide">{marble.title}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-neutral-600">
                        {marble.colorTone || '—'}
                      </td>
                      <td className="px-8 py-6 text-neutral-600">
                        {marble.originCountry || '—'}
                      </td>
                      <td className="px-8 py-6 text-neutral-600">
                        {marble.stockQuantity}
                      </td>
                      <td className="px-8 py-6">
                        {marble.isVisible ? (
                          <span className="flex items-center gap-2 text-green-600">
                            <Eye className="w-4 h-4" />
                            {t('admin.yes')}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-neutral-400">
                            <EyeOff className="w-4 h-4" />
                            {t('admin.no')}
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-2">
                          <Link to={`/yonetim/marbles/${marble.id}/edit`}>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-3 hover:bg-neutral-100 transition-colors rounded"
                              title={t('admin.edit')}
                            >
                              <Edit2 className="w-4 h-4" />
                            </motion.button>
                          </Link>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(marble.id, marble.title)}
                            className="p-3 hover:bg-red-50 text-red-600 transition-colors rounded"
                            title={t('admin.delete')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredMarbles.length === 0 && (
              <div className="text-center py-16 text-neutral-400">
                <p className="tracking-wide">Mermer bulunamadı</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Grid View */}
        {!isLoading && viewMode === 'grid' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredMarbles.map((marble, index) => (
              <motion.div
                key={marble.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="bg-white shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-shadow duration-500 overflow-hidden group"
              >
                <div className="aspect-square bg-neutral-100 overflow-hidden relative">
                  <img
                    src={marble.imageUrl}
                    alt={marble.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {!marble.isVisible && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 text-white text-xs uppercase tracking-wide flex items-center gap-1">
                      <EyeOff className="w-3 h-3" />
                      Gizli
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="tracking-wide uppercase text-sm mb-2 truncate">
                    {marble.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mb-4">
                    {marble.colorTone || '—'} • Stock: {marble.stockQuantity}
                  </p>
                  <div className="flex gap-2">
                    <Link to={`/yonetim/marbles/${marble.id}/edit`} className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-3 bg-neutral-900 text-white hover:bg-neutral-800 text-xs uppercase tracking-wide transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit2 className="w-3 h-3" />
                        {t('admin.edit')}
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDelete(marble.id, marble.title)}
                      className="px-4 py-3 border border-red-600 text-red-600 hover:bg-red-50 text-xs uppercase tracking-wide transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!isLoading && filteredMarbles.length === 0 && viewMode === 'grid' && (
          <div className="text-center py-32 text-neutral-400">
            <p className="text-2xl tracking-wide">Mermer bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
}