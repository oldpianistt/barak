export interface Marble {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  colorTone?: string;
  originCountry?: string;
  category?: string;
  stockQuantity: number;
  isVisible: boolean;
  technicalSpecs?: {
    density?: string;
    waterAbsorption?: string;
    compressiveStrength?: string;
    flexuralStrength?: string;
  };
}

export interface MarbleFormData {
  title: string;
  description: string;
  colorTone?: string;
  originCountry?: string;
  category?: string;
  stockQuantity: number;
  isVisible: boolean;
  technicalSpecs?: {
    density?: string;
    waterAbsorption?: string;
    compressiveStrength?: string;
    flexuralStrength?: string;
  };
  imageFile?: File;
}
