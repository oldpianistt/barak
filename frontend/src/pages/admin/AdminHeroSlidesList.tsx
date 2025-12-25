import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAdminHeroSlides, useDeleteHeroSlide } from '../../hooks/useHeroSlides';
import { Plus, Edit2, Trash2, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';

export function AdminHeroSlidesList() {
    const { data: heroSlides, isLoading } = useAdminHeroSlides();
    const deleteMutation = useDeleteHeroSlide();

    const handleDelete = async (id: number, title: string) => {
        if (confirm(`Hero slide'ı silmek istediğinizden emin misiniz?\n\n"${title}"`)) {
            try {
                await deleteMutation.mutateAsync(id);
            } catch (error) {
                console.error('Delete failed:', error);
                alert('Hero slide silinemedi. Lütfen tekrar deneyin.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white pt-32 pb-16">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white p-10 mb-12 shadow-lg shadow-black/5"
                >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
                        <div>
                            <h1 className="text-5xl tracking-[0.1em] uppercase font-light mb-2">
                                Hero <span className="italic font-serif">Slides</span>
                            </h1>
                            <p className="text-neutral-600 tracking-wide">
                                {heroSlides?.length || 0} ana sayfa slider görseli
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Link
                                to="/yonetim"
                                className="px-6 py-3 bg-neutral-600 hover:bg-neutral-700 text-white tracking-[0.2em] uppercase text-sm transition-colors duration-300"
                            >
                                ← Mermerler
                            </Link>

                            <Link
                                to="/yonetim/hero-slides/new"
                                className="px-6 py-3 bg-neutral-900 hover:bg-black text-white tracking-[0.2em] uppercase text-sm transition-colors duration-300 flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Yeni Slider Görseli
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {isLoading ? (
                    <div className="text-center py-32">
                        <div className="w-12 h-12 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin mx-auto"></div>
                        <p className="mt-6 text-neutral-600 tracking-wide">Yükleniyor...</p>
                    </div>
                ) : (heroSlides || []).length === 0 ? (
                    <div className="text-center py-32 bg-white">
                        <ImageIcon className="w-24 h-24 text-neutral-300 mx-auto mb-6" />
                        <h3 className="text-2xl tracking-wide mb-4 text-neutral-600">Henüz hero slide yok</h3>
                        <p className="text-neutral-500 mb-8">Ana sayfa slider'ı için ilk görseli ekleyin</p>
                        <Link
                            to="/yonetim/hero-slides/new"
                            className="inline-block px-8 py-4 bg-neutral-900 text-white hover:bg-black tracking-[0.2em] uppercase text-sm transition-colors"
                        >
                            <Plus className="w-4 h-4 inline mr-2" />
                            İlk Slider Görselini Ekle
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(heroSlides || []).map((slide) => (
                            <motion.div
                                key={slide.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white shadow-lg overflow-hidden group"
                            >
                                <div className="aspect-video relative overflow-hidden bg-neutral-100">
                                    {slide.imageUrl ? (
                                        <img
                                            src={slide.imageUrl}
                                            alt={slide.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ImageIcon className="w-16 h-16 text-neutral-300" />
                                        </div>
                                    )}

                                    <div className="absolute top-4 right-4">
                                        {slide.isActive ? (
                                            <div className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 text-xs tracking-wide">
                                                <Eye className="w-3 h-3" />
                                                Aktif
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1 bg-neutral-500 text-white px-3 py-1 text-xs tracking-wide">
                                                <EyeOff className="w-3 h-3" />
                                                Pasif
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl tracking-wide mb-2 font-medium">{slide.title}</h3>
                                    <p className="text-sm text-neutral-500 mb-4">Sıra: {slide.displayOrder}</p>

                                    <div className="flex gap-2">
                                        <Link
                                            to={`/yonetim/hero-slides/${slide.id}/edit`}
                                            className="flex-1 px-4 py-2 bg-neutral-900 text-white hover:bg-black text-center tracking-[0.1em] uppercase text-xs transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Edit2 className="w-3 h-3" />
                                            Düzenle
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(slide.id, slide.title)}
                                            className="px-4 py-2 border border-red-600 text-red-600 hover:bg-red-50 tracking-[0.1em] uppercase text-xs transition-colors flex items-center gap-2"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
