export interface HeroSlide {
    id: number;
    title: string;
    imageUrl: string;
    displayOrder: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface HeroSlideFormData {
    title: string;
    displayOrder: number;
    isActive: boolean;
    imageFile?: File;
}
