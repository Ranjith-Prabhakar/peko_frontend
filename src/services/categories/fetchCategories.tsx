import axios from "../../api/axiosInstance";
import type { Category } from "../../types/category";

export const fetchCategories = async (): Promise<Category[] | undefined> => {
  try {
    const response = await axios.get("/category/categories", {
      withCredentials: true,
      requiresAuth: true
    });

    console.log("response.data", response.data.data);

    return response.data.data as Category[];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};
