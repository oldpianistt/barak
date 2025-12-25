import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useMarble, useCreateMarble, useUpdateMarble } from '../../hooks/useMarbles';
import type { MarbleFormData } from '../../types/marble';
import { ArrowLeft, Upload, Check } from 'lucide-react';

export function AdminMarbleForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [imageFile, setImageFile] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string>();

  const { data: marble, isLoading } = useMarble(id ? parseInt(id) : 0);
  const createMutation = useCreateMarble();
  const updateMutation = useUpdateMarble(id ? parseInt(id) : 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MarbleFormData>({
    defaultValues: {
      title: '',
      description: '',
      colorTone: '',
      originCountry: '',
      category: '',
      stockQuantity: 0,
      isVisible: true,
      technicalSpecs: {
        density: '',
        waterAbsorption: '',
        compressiveStrength: '',
        flexuralStrength: '',
      }
    }
  });

  useEffect(() => {
    if (marble && isEditMode) {
      reset({
        title: marble.title,
        description: marble.description || '',
        colorTone: marble.colorTone || '',
        originCountry: marble.originCountry || '',
        category: marble.category || '',
        stockQuantity: marble.stockQuantity,
        isVisible: marble.isVisible,
        technicalSpecs: marble.technicalSpecs || {
          density: '',
          waterAbsorption: '',
          compressiveStrength: '',
          flexuralStrength: '',
        }
      });
      setImagePreview(marble.imageUrl);
    }
  }, [marble, isEditMode, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: MarbleFormData) => {
    try {
      const formDataToSend: MarbleFormData = {
        ...data,
        imageFile,
      };

      if (isEditMode && id) {
        const updateData = { ...formDataToSend, id: parseInt(id) };
        await updateMutation.mutateAsync(updateData as any);
      } else {
        await createMutation.mutateAsync(formDataToSend);
      }
      navigate('/yonetim/marbles');
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to save marble. Please try again.');
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white pt-32 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/yonetim/marbles"
            className="inline-flex items-center gap-2 mb-8 text-neutral-600 hover:text-neutral-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="tracking-wide text-sm uppercase">Listeye Dön</span>
          </Link>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-10 shadow-lg shadow-black/5"
        >
          <h1 className="text-4xl tracking-[0.1em] uppercase font-light mb-10">
            {isEditMode ? t('admin.editMarble') : t('admin.addMarble')}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium uppercase tracking-wide mb-4">
                {t('admin.image')}
              </label>
              <div className="flex flex-col md:flex-row gap-6">
                {imagePreview && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full md:w-64 h-64 bg-neutral-100 overflow-hidden shadow-lg"
                  >
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
                <label className="flex-1 cursor-pointer border-2 border-dashed border-neutral-300 hover:border-neutral-400 p-12 text-center transition-colors duration-300 group">
                  <div className="flex flex-col items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-neutral-100 group-hover:bg-neutral-200 flex items-center justify-center transition-colors"
                    >
                      <Upload className="w-8 h-8 text-neutral-400" />
                    </motion.div>
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">
                        {t('admin.uploadImage')}
                      </p>
                      <p className="text-xs text-neutral-400">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium uppercase tracking-wide mb-3">
                {t('marble.title')} <span className="text-red-600">*</span>
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                className="w-full px-4 py-4 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
                placeholder="Enter marble title"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-2">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium uppercase tracking-wide mb-3">
                {t('marble.description')}
              </label>
              <textarea
                {...register('description')}
                rows={5}
                className="w-full px-4 py-4 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none transition-shadow"
                placeholder="Enter detailed description"
              />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Color Tone */}
              <div>
                <label className="block text-sm font-medium uppercase tracking-wide mb-3">
                  {t('marble.colorTone')}
                </label>
                <input
                  {...register('colorTone')}
                  className="w-full px-4 py-4 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
                  placeholder="e.g., White, Beige, Gray"
                />
              </div>

              {/* Origin Country */}
              <div>
                <label className="block text-sm font-medium uppercase tracking-wide mb-3">
                  {t('marble.originCountry')}
                </label>
                <input
                  {...register('originCountry')}
                  className="w-full px-4 py-4 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
                  placeholder="e.g., Italy, Turkey, Greece"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium uppercase tracking-wide mb-3">
                  {t('marble.category')}
                </label>
                <input
                  {...register('category')}
                  className="w-full px-4 py-4 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
                  placeholder="e.g., Decorative, Structural"
                />
              </div>

              {/* Stock Quantity */}
              <div>
                <label className="block text-sm font-medium uppercase tracking-wide mb-3">
                  {t('marble.stockQuantity')}
                </label>
                <input
                  type="number"
                  {...register('stockQuantity', { min: 0, valueAsNumber: true })}
                  className="w-full px-4 py-4 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
                  placeholder="0"
                />
              </div>

              {/* Is Visible */}
              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    {...register('isVisible')}
                    className="w-6 h-6 border-2 border-neutral-300 focus:ring-2 focus:ring-neutral-900 cursor-pointer"
                  />
                  <span className="text-sm font-medium uppercase tracking-wide group-hover:text-neutral-600 transition-colors">
                    {t('admin.visible')}
                  </span>
                </label>
              </div>
            </div>

            {/* Technical Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Density */}
              <div>
                <label className="block text-sm font-medium uppercase tracking-wide mb-3">
                  {t('marble.density')}
                </label>
                <input
                  {...register('technicalSpecs.density')}
                  className="w-full px-4 py-4 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
                  placeholder="e.g., 2.71 g/cm³"
                />
              </div>

              {/* Water Absorption */}
              <div>
                <label className="block text-sm font-medium uppercase tracking-wide mb-3">
                  {t('marble.waterAbsorption')}
                </label>
                <input
                  {...register('technicalSpecs.waterAbsorption')}
                  className="w-full px-4 py-4 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
                  placeholder="e.g., 0.1%"
                />
              </div>

              {/* Compressive Strength */}
              <div>
                <label className="block text-sm font-medium uppercase tracking-wide mb-3">
                  {t('marble.compressiveStrength')}
                </label>
                <input
                  {...register('technicalSpecs.compressiveStrength')}
                  className="w-full px-4 py-4 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
                  placeholder="e.g., 150 MPa"
                />
              </div>

              {/* Flexural Strength */}
              <div>
                <label className="block text-sm font-medium uppercase tracking-wide mb-3">
                  {t('marble.flexuralStrength')}
                </label>
                <input
                  {...register('technicalSpecs.flexuralStrength')}
                  className="w-full px-4 py-4 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
                  placeholder="e.g., 10 MPa"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t-2 border-neutral-200">
              <motion.button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 px-10 py-5 bg-neutral-900 text-white hover:bg-neutral-800 disabled:bg-neutral-400 disabled:cursor-not-allowed tracking-[0.2em] uppercase text-sm transition-colors duration-300 shadow-lg shadow-black/10"
              >
                <Check className="w-5 h-5" />
                {createMutation.isPending || updateMutation.isPending ? 'Saving...' : t('admin.save')}
              </motion.button>
              <motion.button
                type="button"
                onClick={() => navigate('/yonetim/marbles')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 border-2 border-neutral-300 text-neutral-900 hover:bg-neutral-50 tracking-[0.2em] uppercase text-sm transition-colors duration-300"
              >
                {t('admin.cancel')}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}