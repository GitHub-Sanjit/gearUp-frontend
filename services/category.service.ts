import { axiosInstance } from "@/lib/axios";
import { CategoriesResponse } from "@/types/category";

export const getCategories = async () => {
  const { data } = await axiosInstance.get<CategoriesResponse>("/categories");

  return data.data.categories;
};
