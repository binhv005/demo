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

const STORAGE_KEYS = {
  products: 'techreview_products_v2',
  categories: 'techreview_categories_v2',
  rankings: 'techreview_rankings_v2',
  comparisons: 'techreview_comparisons_v2',
  articles: 'techreview_articles_v2',
  experts: 'techreview_experts_v2'
};

const getInitialData = <T,>(key: string, fallback: T[]): T[] => {
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn(`[DataContext] Error reading ${key} from storage, fallback to default.`, e);
  }
  return fallback;
};

const saveToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`[DataContext] Error saving ${key} to storage.`, e);
  }
};

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
  const [products, setProducts] = useState<Product[]>(() =>
    getInitialData(STORAGE_KEYS.products, mockProducts)
  );
  const [categories, setCategories] = useState<Category[]>(() =>
    getInitialData(STORAGE_KEYS.categories, mockCategories)
  );
  const [rankings, setRankings] = useState<Ranking[]>(() =>
    getInitialData(STORAGE_KEYS.rankings, mockRankings)
  );
  const [comparisons, setComparisons] = useState<Comparison[]>(() =>
    getInitialData(STORAGE_KEYS.comparisons, mockComparisons)
  );
  const [articles, setArticles] = useState<Article[]>(() =>
    getInitialData(STORAGE_KEYS.articles, mockArticles)
  );
  const [experts, setExperts] = useState<Expert[]>(() =>
    getInitialData(STORAGE_KEYS.experts, mockExperts)
  );
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
        saveToStorage(STORAGE_KEYS.products, pRes.value);
        setIsBackendConnected(true);
      }
      if (cRes.status === 'fulfilled' && cRes.value?.length > 0) {
        setCategories(cRes.value);
        saveToStorage(STORAGE_KEYS.categories, cRes.value);
      }
      if (rRes.status === 'fulfilled' && rRes.value?.length > 0) {
        setRankings(rRes.value);
        saveToStorage(STORAGE_KEYS.rankings, rRes.value);
      }
      if (compRes.status === 'fulfilled' && compRes.value?.length > 0) {
        setComparisons(compRes.value);
        saveToStorage(STORAGE_KEYS.comparisons, compRes.value);
      }
      if (aRes.status === 'fulfilled' && aRes.value?.length > 0) {
        setArticles(aRes.value);
        saveToStorage(STORAGE_KEYS.articles, aRes.value);
      }
      if (eRes.status === 'fulfilled' && eRes.value?.length > 0) {
        setExperts(eRes.value);
        saveToStorage(STORAGE_KEYS.experts, eRes.value);
      }
    } catch (err) {
      console.warn('[DataContext] Backend API offline, continuing with local persistent storage.', err);
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
    let created: Product;
    try {
      created = await productApi.create(prodData);
    } catch {
      created = {
        ...prodData,
        id: `prod-${Date.now()}`,
        views: 1,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
    }
    setProducts((prev) => {
      const next = [created, ...prev.filter((p) => p.id !== created.id && p.slug !== created.slug)];
      saveToStorage(STORAGE_KEYS.products, next);
      return next;
    });
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    let updated: Product | null = null;
    try {
      updated = await productApi.update(id, updates);
    } catch {}
    setProducts((prev) => {
      const next = prev.map((p) => {
        if (p.id === id || p.slug === id) {
          return updated || { ...p, ...updates, updatedAt: new Date().toISOString().split('T')[0] };
        }
        return p;
      });
      saveToStorage(STORAGE_KEYS.products, next);
      return next;
    });
  };

  const deleteProduct = async (id: string) => {
    try {
      await productApi.delete(id);
    } catch {}
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id && p.slug !== id);
      saveToStorage(STORAGE_KEYS.products, next);
      return next;
    });
  };

  // Category Methods
  const addCategory = async (catData: Omit<Category, 'id'>) => {
    let created: Category;
    try {
      created = await categoryApi.create(catData);
    } catch {
      created = {
        ...catData,
        id: `cat-${Date.now()}`
      };
    }
    setCategories((prev) => {
      const next = [...prev.filter((c) => c.id !== created.id && c.slug !== created.slug), created];
      saveToStorage(STORAGE_KEYS.categories, next);
      return next;
    });
  };

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    let updated: Category | null = null;
    try {
      updated = await categoryApi.update(id, updates);
    } catch {}
    setCategories((prev) => {
      const next = prev.map((c) => {
        if (c.id === id || c.slug === id) {
          return updated || { ...c, ...updates };
        }
        return c;
      });
      saveToStorage(STORAGE_KEYS.categories, next);
      return next;
    });
  };

  const deleteCategory = async (id: string) => {
    try {
      await categoryApi.delete(id);
    } catch {}
    setCategories((prev) => {
      const next = prev.filter((c) => c.id !== id && c.slug !== id);
      saveToStorage(STORAGE_KEYS.categories, next);
      return next;
    });
  };

  const toggleCategoryStatus = async (id: string) => {
    const cat = categories.find((c) => c.id === id || c.slug === id);
    if (!cat) return;
    const newStatus = cat.status === 'inactive' ? 'active' : 'inactive';
    await updateCategory(id, { status: newStatus });
  };

  // Ranking Methods
  const updateRanking = async (id: string, updates: Partial<Ranking>) => {
    let updated: Ranking | null = null;
    try {
      updated = await rankingApi.update(id, updates);
    } catch {}
    setRankings((prev) => {
      const next = prev.map((r) => {
        if (r.id === id || r.slug === id) {
          return updated || {
            ...r,
            ...updates,
            updatedAt: `${new Date().getDate()} Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`
          };
        }
        return r;
      });
      saveToStorage(STORAGE_KEYS.rankings, next);
      return next;
    });
  };

  const addRanking = async (rankData: Omit<Ranking, 'id' | 'updatedAt'>) => {
    let created: Ranking;
    try {
      created = await rankingApi.create(rankData);
    } catch {
      created = {
        ...rankData,
        id: `rank-${Date.now()}`,
        updatedAt: `${new Date().getDate()} Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`
      };
    }
    setRankings((prev) => {
      const next = [created, ...prev.filter((r) => r.id !== created.id && r.slug !== created.slug)];
      saveToStorage(STORAGE_KEYS.rankings, next);
      return next;
    });
  };

  const deleteRanking = async (id: string) => {
    try {
      await rankingApi.delete(id);
    } catch {}
    setRankings((prev) => {
      const next = prev.filter((r) => r.id !== id && r.slug !== id);
      saveToStorage(STORAGE_KEYS.rankings, next);
      return next;
    });
  };

  // Article Methods
  const addArticle = async (artData: Omit<Article, 'id' | 'publishedAt' | 'views'>) => {
    let created: Article;
    try {
      created = await articleApi.create(artData);
    } catch {
      created = {
        ...artData,
        id: `art-${Date.now()}`,
        publishedAt: `${new Date().getDate()} Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`,
        views: 1
      };
    }
    setArticles((prev) => {
      const next = [created, ...prev.filter((a) => a.id !== created.id && a.slug !== created.slug)];
      saveToStorage(STORAGE_KEYS.articles, next);
      return next;
    });
  };

  const updateArticle = async (id: string, updates: Partial<Article>) => {
    let updated: Article | null = null;
    try {
      updated = await articleApi.update(id, updates);
    } catch {}
    setArticles((prev) => {
      const next = prev.map((a) => {
        if (a.id === id || a.slug === id) {
          return updated || { ...a, ...updates };
        }
        return a;
      });
      saveToStorage(STORAGE_KEYS.articles, next);
      return next;
    });
  };

  const deleteArticle = async (id: string) => {
    try {
      await articleApi.delete(id);
    } catch {}
    setArticles((prev) => {
      const next = prev.filter((a) => a.id !== id && a.slug !== id);
      saveToStorage(STORAGE_KEYS.articles, next);
      return next;
    });
  };

  // Comparison Methods
  const addComparison = async (compData: Omit<Comparison, 'id' | 'updatedAt'>) => {
    let created: Comparison;
    try {
      created = await comparisonApi.create(compData);
    } catch {
      created = {
        ...compData,
        id: `comp-${Date.now()}`,
        updatedAt: `${new Date().getDate()} Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`
      };
    }
    setComparisons((prev) => {
      const next = [created, ...prev.filter((c) => c.id !== created.id && c.slug !== created.slug)];
      saveToStorage(STORAGE_KEYS.comparisons, next);
      return next;
    });
  };

  const updateComparison = async (id: string, updates: Partial<Comparison>) => {
    let updated: Comparison | null = null;
    try {
      updated = await comparisonApi.update(id, updates);
    } catch {}
    setComparisons((prev) => {
      const next = prev.map((c) => {
        if (c.id === id || c.slug === id) {
          return updated || { ...c, ...updates };
        }
        return c;
      });
      saveToStorage(STORAGE_KEYS.comparisons, next);
      return next;
    });
  };

  const deleteComparison = async (id: string) => {
    try {
      await comparisonApi.delete(id);
    } catch {}
    setComparisons((prev) => {
      const next = prev.filter((c) => c.id !== id && c.slug !== id);
      saveToStorage(STORAGE_KEYS.comparisons, next);
      return next;
    });
  };

  // Expert Methods
  const addExpert = async (expData: Omit<Expert, 'id'>) => {
    let created: Expert;
    try {
      created = await expertApi.create(expData);
    } catch {
      created = {
        ...expData,
        id: `expert-${Date.now()}`
      };
    }
    setExperts((prev) => {
      const next = [created, ...prev.filter((e) => e.id !== created.id)];
      saveToStorage(STORAGE_KEYS.experts, next);
      return next;
    });
  };

  const updateExpert = async (id: string, updates: Partial<Expert>) => {
    let updated: Expert | null = null;
    try {
      updated = await expertApi.update(id, updates);
    } catch {}
    setExperts((prev) => {
      const next = prev.map((e) => {
        if (e.id === id) {
          return updated || { ...e, ...updates };
        }
        return e;
      });
      saveToStorage(STORAGE_KEYS.experts, next);
      return next;
    });
  };

  const deleteExpert = async (id: string) => {
    try {
      await expertApi.delete(id);
    } catch {}
    setExperts((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveToStorage(STORAGE_KEYS.experts, next);
      return next;
    });
  };

  const resetData = async () => {
    try {
      await systemApi.seedData();
    } catch {}
    saveToStorage(STORAGE_KEYS.products, mockProducts);
    saveToStorage(STORAGE_KEYS.categories, mockCategories);
    saveToStorage(STORAGE_KEYS.rankings, mockRankings);
    saveToStorage(STORAGE_KEYS.comparisons, mockComparisons);
    saveToStorage(STORAGE_KEYS.articles, mockArticles);
    saveToStorage(STORAGE_KEYS.experts, mockExperts);
    setProducts(mockProducts);
    setCategories(mockCategories);
    setRankings(mockRankings);
    setComparisons(mockComparisons);
    setArticles(mockArticles);
    setExperts(mockExperts);
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
