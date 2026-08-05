export interface Category {
  id: string;
  name: string;
  description: string | null;
}

export interface Gear {
  id: string;

  name: string;
  description: string | null;

  brand: string | null;

  image: string | null;

  dailyRentalPrice: number;

  stockQuantity: number;
  availableQuantity: number;

  condition: "GOOD" | "FAIR" | "POOR";

  isAvailable: boolean;

  categoryId: string;
  category: Category;

  createdAt: string;
  updatedAt: string;
}

export interface GearResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: {
    gears: Gear[];
  };
}
