export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Provider {
  id: string;
  name: string;
}

export interface Gear {
  id: string;

  name: string;
  description?: string;

  brand?: string;

  image?: string;

  dailyRentalPrice: number;

  stockQuantity: number;

  availableQuantity: number;

  isAvailable: boolean;

  condition: string;

  provider: Provider;

  category: Category;
}
