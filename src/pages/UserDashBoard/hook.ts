import  { useEffect, useState } from 'react';
import { fetchCategories } from '../../services/categories/fetchCategories';
import type { Category } from '../../types/category';

function useUserDashBoardHook() {
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function getCategories() {
      try {
        const categories = await fetchCategories();
        if (categories && isMounted) setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    getCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    activeMenuId,
    setActiveMenuId,
    categories,
  };
}

export default useUserDashBoardHook;
