import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { HeroSlide, HeroSlideFormData } from '../types/heroSlide';

const API_BASE_URL = 'http://localhost:8081/api';

// Fetch active hero slides for public homepage
export function useHeroSlides() {
    return useQuery<HeroSlide[]>({
        queryKey: ['heroSlides'],
        queryFn: async () => {
            const response = await fetch(`${API_BASE_URL}/public/hero-slides`);
            if (!response.ok) {
                throw new Error('Failed to fetch hero slides');
            }
            return response.json();
        },
    });
}

// Fetch all hero slides for admin panel
export function useAdminHeroSlides() {
    return useQuery<HeroSlide[]>({
        queryKey: ['adminHeroSlides'],
        queryFn: async () => {
            const response = await fetch(`${API_BASE_URL}/admin/hero-slides`, {
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch admin hero slides');
            }
            return response.json();
        },
    });
}

// Create hero slide
export function useCreateHeroSlide() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: HeroSlideFormData) => {
            const data = new FormData();

            // Create request object
            const requestData = {
                title: formData.title,
                displayOrder: formData.displayOrder,
                isActive: formData.isActive,
            };

            // Add request as JSON blob
            data.append('request', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));

            // Add imageFile if exists
            if (formData.imageFile) {
                data.append('imageFile', formData.imageFile);
            }

            const response = await fetch(`${API_BASE_URL}/admin/hero-slides`, {
                method: 'POST',
                body: data,
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to create hero slide');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['heroSlides'] });
            queryClient.invalidateQueries({ queryKey: ['adminHeroSlides'] });
        },
    });
}

// Update hero slide
export function useUpdateHeroSlide() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, formData }: { id: number; formData: HeroSlideFormData }) => {
            const data = new FormData();

            // Create request object
            const requestData = {
                title: formData.title,
                displayOrder: formData.displayOrder,
                isActive: formData.isActive,
            };

            // Add request as JSON blob
            data.append('request', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));

            // Add imageFile if exists
            if (formData.imageFile) {
                data.append('imageFile', formData.imageFile);
            }

            const response = await fetch(`${API_BASE_URL}/admin/hero-slides/${id}`, {
                method: 'PUT',
                body: data,
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to update hero slide');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['heroSlides'] });
            queryClient.invalidateQueries({ queryKey: ['adminHeroSlides'] });
        },
    });
}

// Delete hero slide
export function useDeleteHeroSlide() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const response = await fetch(`${API_BASE_URL}/admin/hero-slides/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to delete hero slide');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['heroSlides'] });
            queryClient.invalidateQueries({ queryKey: ['adminHeroSlides'] });
        },
    });
}
