import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import { Marble, MarbleFormData } from '../types/marble';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export function useMarbles(page: number = 0, size: number = 20, onlyVisible: boolean = false) {
  return useQuery({
    queryKey: ['marbles', page, size, onlyVisible],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });
      if (onlyVisible) {
        params.append('onlyVisible', 'true');
      }
      const response = await api.get<PageResponse<any>>(`/marble-images?${params}`);
      // Transform backend response to match frontend type
      const transformedContent = response.data.content.map((item: any) => ({
        ...item,
        technicalSpecs: {
          density: item.density,
          waterAbsorption: item.waterAbsorption,
          compressiveStrength: item.compressiveStrength,
          flexuralStrength: item.flexuralStrength,
        },
      }));
      return { ...response.data, content: transformedContent };
    },
    staleTime: 30000,
  });
}

export function useMarble(id: number) {
  return useQuery({
    queryKey: ['marble', id],
    queryFn: async () => {
      const response = await api.get<any>(`/marble-images/${id}`);
      // Transform backend response to match frontend type
      const marble = {
        ...response.data,
        technicalSpecs: {
          density: response.data.density,
          waterAbsorption: response.data.waterAbsorption,
          compressiveStrength: response.data.compressiveStrength,
          flexuralStrength: response.data.flexuralStrength,
        },
      };
      return marble;
    },
    enabled: !!id,
  });
}

export function useCreateMarble() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: MarbleFormData) => {
      if (USE_MOCK_DATA) {
        console.log('🔄 Mock mode: Simulating marble creation', formData);
        return { id: Date.now(), ...formData, imageUrl: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800&q=80' };
      }

      const data = new FormData();

      // Backend düz field bekliyor, nested değil
      const requestData = {
        title: formData.title,
        description: formData.description,
        colorTone: formData.colorTone,
        originCountry: formData.originCountry,
        category: formData.category,
        density: formData.technicalSpecs?.density,
        waterAbsorption: formData.technicalSpecs?.waterAbsorption,
        compressiveStrength: formData.technicalSpecs?.compressiveStrength,
        flexuralStrength: formData.technicalSpecs?.flexuralStrength,
        stockQuantity: formData.stockQuantity,
        isVisible: formData.isVisible,
      };

      // Add request as JSON blob
      data.append('request', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));

      // Add imageFile separately if exists
      if (formData.imageFile) {
        data.append('imageFile', formData.imageFile);
      }

      const response = await api.post<Marble>('/marble-images', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marbles'] });
    },
  });
}

export function useUpdateMarble(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: MarbleFormData) => {
      if (USE_MOCK_DATA) {
        console.log('🔄 Mock mode: Simulating marble update', id, formData);
        return { id, ...formData, imageUrl: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800&q=80' };
      }

      const data = new FormData();

      // Backend düz field bekliyor, nested değil
      const requestData = {
        title: formData.title,
        description: formData.description,
        colorTone: formData.colorTone,
        originCountry: formData.originCountry,
        category: formData.category,
        density: formData.technicalSpecs?.density,
        waterAbsorption: formData.technicalSpecs?.waterAbsorption,
        compressiveStrength: formData.technicalSpecs?.compressiveStrength,
        flexuralStrength: formData.technicalSpecs?.flexuralStrength,
        stockQuantity: formData.stockQuantity,
        isVisible: formData.isVisible,
      };

      // Add request as JSON blob
      data.append('request', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));

      // Add imageFile separately if exists
      if (formData.imageFile) {
        data.append('imageFile', formData.imageFile);
      }

      const response = await api.put<Marble>(`/marble-images/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marbles'] });
      queryClient.invalidateQueries({ queryKey: ['marble', id] });
    },
  });
}

export function useDeleteMarble() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      if (USE_MOCK_DATA) {
        console.log('🔄 Mock mode: Simulating marble deletion', id);
        return;
      }

      await api.delete(`/marble-images/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marbles'] });
    },
  });
}