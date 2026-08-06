import { axiosInstance } from "@/lib/axios";
import type { Category } from "@/types/gear";

interface CategoryResponse {
  data: {
    categories: Category[];
  };
}

export const getCategories = async () => {
  const { data } = await axiosInstance.get<CategoryResponse>("/categories");

  return data.data.categories;
};
