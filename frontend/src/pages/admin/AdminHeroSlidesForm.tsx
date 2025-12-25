import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCreateHeroSlide, useUpdateHeroSlide, useAdminHeroSlides } from '../../hooks/useHeroSlides';
import { ArrowLeft, Upload, X } from 'lucide-react';

export function AdminHeroSlidesForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const { data: heroSlides } = useAdminHeroSlides();
    const createMutation = useCreateHeroSlide();
    const updateMutation = useUpdateHeroSlide();

    const [formData, setFormData] = useState({
        title: '',
        displayOrder: 0,
        isActive: true,
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isEdit && id && heroSlides) {
            const slide = heroSlides.find(s => s.id === parseInt(id));
            if (slide) {
                setFormData({
                    title: slide.title,
                    displayOrder: slide.displayOrder,
                    isActive: slide.isActive,
                });
                if (slide.imageUrl) {
                    setImagePreview(slide.imageUrl);
                }
            }
        }
    }, [isEdit, id, heroSlides]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = {
                ...formData,
                imageFile: imageFile || undefined,
            };

            if (isEdit && id) {
                await updateMutation.mutateAsync({ id: parseInt(id), formData: data });
            } else {
                await createMutation.mutateAsync(data);
            }
            navigate('/yonetim/hero-slides');
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Hero slide kaydedilemedi. Lütfen tekrar deneyin.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white pt-32 pb-16">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Link
                        to="/yonetim/hero-slides"
                        className="inline-flex items-center gap-2 mb-8 text-neutral-600 hover:text-neutral-900 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="tracking-wide">Hero Slides'a Dön</span>
                    </Link>

                    <div className="bg-white p-10 shadow-lg">
                        <h1 className="text-4xl tracking-[0.1em] uppercase font-light mb-8">
                            {isEdit ? 'Slider Görseli Düzenle' : 'Yeni Slider Görseli'}
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm tracking-wide text-neutral-700 mb-3">
                                    Görsel *
                                </label>
                                <div className="relative">
                                    {imagePreview ? (
                                        <div className="relative aspect-video w-full bg-neutral-100 rounded overflow-hidden group">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImageFile(null);
                                                    setImagePreview('');
                                                }}
                                                className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center aspect-video w-full border-2 border-dashed border-neutral-300 rounded cursor-pointer hover:border-neutral-900 transition-colors bg-neutral-50">
                                            <Upload className="w-12 h-12 text-neutral-400 mb-4" />
                                            <span className="text-sm text-neutral-600 tracking-wide">Görsel Yükle</span>
                                            <span className="text-xs text-neutral-400 mt-2">PNG, JPG (Max 5MB)</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                                required={!isEdit}
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm tracking-wide text-neutral-700 mb-3">
                                    Başlık *
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
                                    required
                                    placeholder="Örn: Beyaz Mermer Koleksiyonu"
                                />
                            </div>

                            {/* Display Order */}
                            <div>
                                <label htmlFor="displayOrder" className="block text-sm tracking-wide text-neutral-700 mb-3">
                                    Sıralama
                                </label>
                                <input
                                    id="displayOrder"
                                    type="number"
                                    min="0"
                                    value={formData.displayOrder}
                                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
                                />
                                <p className="text-xs text-neutral-500 mt-2">Küçük numara önce gösterilir</p>
                            </div>

                            {/* Active Status */}
                            <div className="flex items-center gap-3">
                                <input
                                    id="isActive"
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-5 h-5 border-neutral-300 rounded focus:ring-neutral-900"
                                />
                                <label htmlFor="isActive" className="text-sm tracking-wide text-neutral-700">
                                    Ana sayfada göster
                                </label>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 pt-6">
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 px-10 py-5 bg-neutral-900 text-white hover:bg-black tracking-[0.2em] uppercase text-sm transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Kaydediliyor...' : isEdit ? 'Güncelle' : 'Oluştur'}
                                </motion.button>
                                <motion.button
                                    type="button"
                                    onClick={() => navigate('/yonetim/hero-slides')}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-10 py-5 border-2 border-neutral-300 text-neutral-900 hover:bg-neutral-50 tracking-[0.2em] uppercase text-sm transition-colors duration-300"
                                >
                                    İptal
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
