import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, Category, Ranking, Comparison, Article, Expert } from '../types';
import { mockProducts } from '../data/products';
import { mockCategories } from '../data/categories';
import { mockRankings } from '../data/rankings';
import { mockComparisons } from '../data/comparisons';
import { mockArticles } from '../data/articles';
import { mockExperts } from '../data/experts';
import { sanitizeArticleRanks } from '../utils/articleRank';
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
    sanitizeArticleRanks(getInitialData(STORAGE_KEYS.articles, mockArticles))
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
        const sanitizedArticles = sanitizeArticleRanks(aRes.value);
        setArticles(sanitizedArticles);
        saveToStorage(STORAGE_KEYS.articles, sanitizedArticles);
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
    const tempId = `prod-${Date.now()}`;
    const newProd: Product = {
      ...prodData,
      id: tempId,
      views: 1,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setProducts((prev) => {
      const next = [newProd, ...prev.filter((p) => p.slug !== newProd.slug)];
      saveToStorage(STORAGE_KEYS.products, next);
      return next;
    });

    productApi.create(prodData).then((created) => {
      if (created) {
        setProducts((prev) => {
          const next = prev.map((p) => (p.id === tempId || p.slug === created.slug ? created : p));
          saveToStorage(STORAGE_KEYS.products, next);
          return next;
        });
      }
    }).catch(() => {});
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    setProducts((prev) => {
      const next = prev.map((p) => {
        if (p.id === id || p.slug === id) {
          return { ...p, ...updates, updatedAt: new Date().toISOString().split('T')[0] };
        }
        return p;
      });
      saveToStorage(STORAGE_KEYS.products, next);
      return next;
    });

    productApi.update(id, updates).then((updated) => {
      if (updated) {
        setProducts((prev) => {
          const next = prev.map((p) => (p.id === id || p.slug === id ? updated : p));
          saveToStorage(STORAGE_KEYS.products, next);
          return next;
        });
      }
    }).catch(() => {});
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id && p.slug !== id);
      saveToStorage(STORAGE_KEYS.products, next);
      return next;
    });
    productApi.delete(id).catch(() => {});
  };

  // Category Methods
  const addCategory = async (catData: Omit<Category, 'id'>) => {
    const tempId = `cat-${Date.now()}`;
    const newCat: Category = {
      ...catData,
      id: tempId
    };
    setCategories((prev) => {
      const next = [...prev.filter((c) => c.slug !== newCat.slug), newCat];
      saveToStorage(STORAGE_KEYS.categories, next);
      return next;
    });

    categoryApi.create(catData).then((created) => {
      if (created) {
        setCategories((prev) => {
          const next = prev.map((c) => (c.id === tempId || c.slug === created.slug ? created : c));
          saveToStorage(STORAGE_KEYS.categories, next);
          return next;
        });
      }
    }).catch(() => {});
  };

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    setCategories((prev) => {
      const next = prev.map((c) => {
        if (c.id === id || c.slug === id) {
          return { ...c, ...updates };
        }
        return c;
      });
      saveToStorage(STORAGE_KEYS.categories, next);
      return next;
    });

    categoryApi.update(id, updates).then((updated) => {
      if (updated) {
        setCategories((prev) => {
          const next = prev.map((c) => (c.id === id || c.slug === id ? updated : c));
          saveToStorage(STORAGE_KEYS.categories, next);
          return next;
        });
      }
    }).catch(() => {});
  };

  const deleteCategory = async (id: string) => {
    setCategories((prev) => {
      const next = prev.filter((c) => c.id !== id && c.slug !== id);
      saveToStorage(STORAGE_KEYS.categories, next);
      return next;
    });
    categoryApi.delete(id).catch(() => {});
  };

  const toggleCategoryStatus = async (id: string) => {
    const cat = categories.find((c) => c.id === id || c.slug === id);
    if (!cat) return;
    const newStatus = cat.status === 'inactive' ? 'active' : 'inactive';
    updateCategory(id, { status: newStatus });
  };

  // Ranking Methods
  const updateRanking = async (id: string, updates: Partial<Ranking>) => {
    setRankings((prev) => {
      const next = prev.map((r) => {
        if (r.id === id || r.slug === id) {
          return {
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

    rankingApi.update(id, updates).then((updated) => {
      if (updated) {
        setRankings((prev) => {
          const next = prev.map((r) => (r.id === id || r.slug === id ? updated : r));
          saveToStorage(STORAGE_KEYS.rankings, next);
          return next;
        });
      }
    }).catch(() => {});
  };

  const addRanking = async (rankData: Omit<Ranking, 'id' | 'updatedAt'>) => {
    const tempId = `rank-${Date.now()}`;
    const newRank: Ranking = {
      ...rankData,
      id: tempId,
      updatedAt: `${new Date().getDate()} Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`
    };
    setRankings((prev) => {
      const next = [newRank, ...prev.filter((r) => r.slug !== newRank.slug)];
      saveToStorage(STORAGE_KEYS.rankings, next);
      return next;
    });

    rankingApi.create(rankData).then((created) => {
      if (created) {
        setRankings((prev) => {
          const next = prev.map((r) => (r.id === tempId || r.slug === created.slug ? created : r));
          saveToStorage(STORAGE_KEYS.rankings, next);
          return next;
        });
      }
    }).catch(() => {});
  };

  const deleteRanking = async (id: string) => {
    setRankings((prev) => {
      const next = prev.filter((r) => r.id !== id && r.slug !== id);
      saveToStorage(STORAGE_KEYS.rankings, next);
      return next;
    });
    rankingApi.delete(id).catch(() => {});
  };

  // Article Methods
  const addArticle = async (artData: Omit<Article, 'id' | 'publishedAt' | 'views'>) => {
    const tempId = `art-${Date.now()}`;
    const newArt: Article = {
      ...artData,
      id: tempId,
      publishedAt: `${new Date().getDate()} Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`,
      views: 1
    };
    setArticles((prev) => {
      const next = [newArt, ...prev.filter((a) => a.slug !== newArt.slug)];
      saveToStorage(STORAGE_KEYS.articles, next);
      return next;
    });

    articleApi.create(artData).then((created) => {
      if (created) {
        setArticles((prev) => {
          const next = prev.map((a) => (a.id === tempId || a.slug === created.slug ? created : a));
          saveToStorage(STORAGE_KEYS.articles, next);
          return next;
        });
      }
    }).catch(() => {});
  };

  const updateArticle = async (id: string, updates: Partial<Article>) => {
    setArticles((prev) => {
      const next = prev.map((a) => {
        if (a.id === id || a.slug === id) {
          return { ...a, ...updates };
        }
        return a;
      });
      saveToStorage(STORAGE_KEYS.articles, next);
      return next;
    });

    articleApi.update(id, updates).then((updated) => {
      if (updated) {
        setArticles((prev) => {
          const next = prev.map((a) => (a.id === id || a.slug === id ? updated : a));
          saveToStorage(STORAGE_KEYS.articles, next);
          return next;
        });
      }
    }).catch(() => {});
  };

  const deleteArticle = async (id: string) => {
    setArticles((prev) => {
      const next = prev.filter((a) => a.id !== id && a.slug !== id);
      saveToStorage(STORAGE_KEYS.articles, next);
      return next;
    });
    articleApi.delete(id).catch(() => {});
  };

  // Comparison Methods
  const addComparison = async (compData: Omit<Comparison, 'id' | 'updatedAt'>) => {
    const tempId = `comp-${Date.now()}`;
    const newComp: Comparison = {
      ...compData,
      id: tempId,
      updatedAt: `${new Date().getDate()} Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`
    };
    setComparisons((prev) => {
      const next = [newComp, ...prev.filter((c) => c.slug !== newComp.slug)];
      saveToStorage(STORAGE_KEYS.comparisons, next);
      return next;
    });

    comparisonApi.create(compData).then((created) => {
      if (created) {
        setComparisons((prev) => {
          const next = prev.map((c) => (c.id === tempId || c.slug === created.slug ? created : c));
          saveToStorage(STORAGE_KEYS.comparisons, next);
          return next;
        });
      }
    }).catch(() => {});
  };

  const updateComparison = async (id: string, updates: Partial<Comparison>) => {
    setComparisons((prev) => {
      const next = prev.map((c) => {
        if (c.id === id || c.slug === id) {
          return { ...c, ...updates };
        }
        return c;
      });
      saveToStorage(STORAGE_KEYS.comparisons, next);
      return next;
    });

    comparisonApi.update(id, updates).then((updated) => {
      if (updated) {
        setComparisons((prev) => {
          const next = prev.map((c) => (c.id === id || c.slug === id ? updated : c));
          saveToStorage(STORAGE_KEYS.comparisons, next);
          return next;
        });
      }
    }).catch(() => {});
  };

  const deleteComparison = async (id: string) => {
    setComparisons((prev) => {
      const next = prev.filter((c) => c.id !== id && c.slug !== id);
      saveToStorage(STORAGE_KEYS.comparisons, next);
      return next;
    });
    comparisonApi.delete(id).catch(() => {});
  };

  // Expert Methods
  const addExpert = async (expData: Omit<Expert, 'id'>) => {
    const tempId = `expert-${Date.now()}`;
    const newExp: Expert = {
      ...expData,
      id: tempId
    };
    setExperts((prev) => {
      const next = [newExp, ...prev.filter((e) => e.id !== tempId)];
      saveToStorage(STORAGE_KEYS.experts, next);
      return next;
    });

    expertApi.create(expData).then((created) => {
      if (created) {
        setExperts((prev) => {
          const next = prev.map((e) => (e.id === tempId ? created : e));
          saveToStorage(STORAGE_KEYS.experts, next);
          return next;
        });
      }
    }).catch(() => {});
  };

  const updateExpert = async (id: string, updates: Partial<Expert>) => {
    setExperts((prev) => {
      const next = prev.map((e) => {
        if (e.id === id) {
          return { ...e, ...updates };
        }
        return e;
      });
      saveToStorage(STORAGE_KEYS.experts, next);
      return next;
    });

    expertApi.update(id, updates).then((updated) => {
      if (updated) {
        setExperts((prev) => {
          const next = prev.map((e) => (e.id === id ? updated : e));
          saveToStorage(STORAGE_KEYS.experts, next);
          return next;
        });
      }
    }).catch(() => {});
  };

  const deleteExpert = async (id: string) => {
    setExperts((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveToStorage(STORAGE_KEYS.experts, next);
      return next;
    });
    expertApi.delete(id).catch(() => {});
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
