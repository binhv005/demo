import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, Category, Ranking, Comparison, Article, Expert } from '../types';
import { mockProducts } from '../data/products';
import { mockCategories } from '../data/categories';
import { mockRankings } from '../data/rankings';
import { mockComparisons } from '../data/comparisons';
import { mockArticles } from '../data/articles';
import { mockExperts } from '../data/experts';
import {
  productApi,
  categoryApi,
  rankingApi,
  comparisonApi,
  articleApi,
  expertApi,
  systemApi
} from '../services/api';

interface DataContextType {
  products: Product[];
  categories: Category[];
  rankings: Ranking[];
  comparisons: Comparison[];
  articles: Article[];
  experts: Expert[];
  isLoading: boolean;
  isBackendConnected: boolean;
  refreshData: () => Promise<void>;
  // Product actions
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'views'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  // Category actions
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  toggleCategoryStatus: (id: string) => Promise<void>;
  // Ranking actions
  updateRanking: (id: string, updates: Partial<Ranking>) => Promise<void>;
  addRanking: (ranking: Omit<Ranking, 'id' | 'updatedAt'>) => Promise<void>;
  deleteRanking: (id: string) => Promise<void>;
  // Article actions
  addArticle: (article: Omit<Article, 'id' | 'publishedAt' | 'views'>) => Promise<void>;
  updateArticle: (id: string, updates: Partial<Article>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  // Comparison actions
  addComparison: (comparison: Omit<Comparison, 'id' | 'updatedAt'>) => Promise<void>;
  updateComparison: (id: string, updates: Partial<Comparison>) => Promise<void>;
  deleteComparison: (id: string) => Promise<void>;
  // Expert actions
  addExpert: (expert: Omit<Expert, 'id'>) => Promise<void>;
  updateExpert: (id: string, updates: Partial<Expert>) => Promise<void>;
  deleteExpert: (id: string) => Promise<void>;
  // Reset Data to default
  resetData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [rankings, setRankings] = useState<Ranking[]>(mockRankings);
  const [comparisons, setComparisons] = useState<Comparison[]>(mockComparisons);
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [experts, setExperts] = useState<Expert[]>(mockExperts);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

  // Fetch initial data from Backend API
  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [pRes, cRes, rRes, compRes, aRes, eRes] = await Promise.allSettled([
        productApi.getAll(),
        categoryApi.getAll(),
        rankingApi.getAll(),
        comparisonApi.getAll(),
        articleApi.getAll(),
        expertApi.getAll()
      ]);

      if (pRes.status === 'fulfilled' && pRes.value?.length > 0) {
        setProducts(pRes.value);
        setIsBackendConnected(true);
      }
      if (cRes.status === 'fulfilled' && cRes.value?.length > 0) {
        setCategories(cRes.value);
      }
      if (rRes.status === 'fulfilled' && rRes.value?.length > 0) {
        setRankings(rRes.value);
      }
      if (compRes.status === 'fulfilled' && compRes.value?.length > 0) {
        setComparisons(compRes.value);
      }
      if (aRes.status === 'fulfilled' && aRes.value?.length > 0) {
        setArticles(aRes.value);
      }
      if (eRes.status === 'fulfilled' && eRes.value?.length > 0) {
        setExperts(eRes.value);
      }
    } catch (err) {
      console.warn('[DataContext] Backend API offline, fallback to mock data.', err);
      setIsBackendConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Product Methods
  const addProduct = async (prodData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'views'>) => {
    try {
      const created = await productApi.create(prodData);
      setProducts((prev) => [created, ...prev]);
    } catch (e) {
      const fallbackProd: Product = {
        ...prodData,
        id: `prod-${Date.now()}`,
        views: 1,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setProducts((prev) => [fallbackProd, ...prev]);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const updated = await productApi.update(id, updates);
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (e) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, ...updates, updatedAt: new Date().toISOString().split('T')[0] }
            : p
        )
      );
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await productApi.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Category Methods
  const addCategory = async (catData: Omit<Category, 'id'>) => {
    try {
      const created = await categoryApi.create(catData);
      setCategories((prev) => [...prev, created]);
    } catch (e) {
      const fallbackCat: Category = {
        ...catData,
        id: `cat-${Date.now()}`
      };
      setCategories((prev) => [...prev, fallbackCat]);
    }
  };

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    try {
      const updated = await categoryApi.update(id, updates);
      setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (e) {
      setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await categoryApi.delete(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const toggleCategoryStatus = async (id: string) => {
    const cat = categories.find((c) => c.id === id);
    if (!cat) return;
    const newStatus = cat.status === 'inactive' ? 'active' : 'inactive';
    await updateCategory(id, { status: newStatus });
  };

  // Ranking Methods
  const updateRanking = async (id: string, updates: Partial<Ranking>) => {
    try {
      const updated = await rankingApi.update(id, updates);
      setRankings((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch (e) {
      setRankings((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                ...updates,
                updatedAt: `${new Date().getDate()} Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`
              }
            : r
        )
      );
    }
  };

  const addRanking = async (rankData: Omit<Ranking, 'id' | 'updatedAt'>) => {
    try {
      const created = await rankingApi.create(rankData);
      setRankings((prev) => [created, ...prev]);
    } catch (e) {
      const fallbackRank: Ranking = {
        ...rankData,
        id: `rank-${Date.now()}`,
        updatedAt: `${new Date().getDate()} Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`
      };
      setRankings((prev) => [fallbackRank, ...prev]);
    }
  };

  const deleteRanking = async (id: string) => {
    try {
      await rankingApi.delete(id);
      setRankings((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      setRankings((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Article Methods
  const addArticle = async (artData: Omit<Article, 'id' | 'publishedAt' | 'views'>) => {
    try {
      const created = await articleApi.create(artData);
      setArticles((prev) => [created, ...prev]);
    } catch (e) {
      const fallbackArt: Article = {
        ...artData,
        id: `art-${Date.now()}`,
        publishedAt: `${new Date().getDate()} Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`,
        views: 1
      };
      setArticles((prev) => [fallbackArt, ...prev]);
    }
  };

  const updateArticle = async (id: string, updates: Partial<Article>) => {
    try {
      const updated = await articleApi.update(id, updates);
      setArticles((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch (e) {
      setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      await articleApi.delete(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    }
  };

  // Comparison Methods
  const addComparison = async (compData: Omit<Comparison, 'id' | 'updatedAt'>) => {
    try {
      const created = await comparisonApi.create(compData);
      setComparisons((prev) => [created, ...prev]);
    } catch (e) {
      const fallbackComp: Comparison = {
        ...compData,
        id: `comp-${Date.now()}`,
        updatedAt: `${new Date().getDate()} Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`
      };
      setComparisons((prev) => [fallbackComp, ...prev]);
    }
  };

  const updateComparison = async (id: string, updates: Partial<Comparison>) => {
    try {
      const updated = await comparisonApi.update(id, updates);
      setComparisons((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (e) {
      setComparisons((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    }
  };

  const deleteComparison = async (id: string) => {
    try {
      await comparisonApi.delete(id);
      setComparisons((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      setComparisons((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // Expert Methods
  const addExpert = async (expData: Omit<Expert, 'id'>) => {
    try {
      const created = await expertApi.create(expData);
      setExperts((prev) => [...prev, created]);
    } catch (e) {
      const fallbackExp: Expert = {
        ...expData,
        id: `expert-${Date.now()}`
      };
      setExperts((prev) => [...prev, fallbackExp]);
    }
  };

  const updateExpert = async (id: string, updates: Partial<Expert>) => {
    try {
      const updated = await expertApi.update(id, updates);
      setExperts((prev) => prev.map((e) => (e.id === id ? updated : e)));
    } catch (e) {
      setExperts((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    }
  };

  const deleteExpert = async (id: string) => {
    try {
      await expertApi.delete(id);
      setExperts((prev) => prev.filter((e) => e.id !== id));
    } catch (e) {
      setExperts((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const resetData = async () => {
    try {
      await systemApi.seedData();
      await refreshData();
    } catch (e) {
      setProducts(mockProducts);
      setCategories(mockCategories);
      setRankings(mockRankings);
      setComparisons(mockComparisons);
      setArticles(mockArticles);
      setExperts(mockExperts);
    }
  };

  return (
    <DataContext.Provider
      value={{
        products,
        categories,
        rankings,
        comparisons,
        articles,
        experts,
        isLoading,
        isBackendConnected,
        refreshData,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        toggleCategoryStatus,
        updateRanking,
        addRanking,
        deleteRanking,
        addArticle,
        updateArticle,
        deleteArticle,
        addComparison,
        updateComparison,
        deleteComparison,
        addExpert,
        updateExpert,
        deleteExpert,
        resetData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
