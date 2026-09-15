import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Ranking, Comparison, Article, Expert } from '../types';
import { mockProducts } from '../data/products';
import { mockCategories } from '../data/categories';
import { mockRankings } from '../data/rankings';
import { mockComparisons } from '../data/comparisons';
import { mockArticles } from '../data/articles';
import { mockExperts } from '../data/experts';

interface DataContextType {
  products: Product[];
  categories: Category[];
  rankings: Ranking[];
  comparisons: Comparison[];
  articles: Article[];
  experts: Expert[];
  // Product actions
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'views'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  // Category actions
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  toggleCategoryStatus: (id: string) => void;
  // Ranking actions
  updateRanking: (id: string, updates: Partial<Ranking>) => void;
  addRanking: (ranking: Omit<Ranking, 'id' | 'updatedAt'>) => void;
  deleteRanking: (id: string) => void;
  // Article actions
  addArticle: (article: Omit<Article, 'id' | 'publishedAt' | 'views'>) => void;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  // Comparison actions
  addComparison: (comparison: Omit<Comparison, 'id' | 'updatedAt'>) => void;
  updateComparison: (id: string, updates: Partial<Comparison>) => void;
  deleteComparison: (id: string) => void;
  // Expert actions
  addExpert: (expert: Omit<Expert, 'id'>) => void;
  updateExpert: (id: string, updates: Partial<Expert>) => void;
  deleteExpert: (id: string) => void;
  // Reset Data to default
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DATA_VERSION = 'v12_extended_catalog_all_cats';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check version and clear stale cache if version changed
  useEffect(() => {
    const currentVersion = localStorage.getItem('demo_data_version');
    if (currentVersion !== DATA_VERSION) {
      localStorage.setItem('demo_data_version', DATA_VERSION);
      const oldKeys = [
        'demo_data_products',
        'demo_data_categories',
        'demo_data_rankings',
        'demo_data_rankings_v5',
        'demo_data_comparisons',
        'demo_data_articles',
        'demo_data_articles_v3',
        'demo_data_experts'
      ];
      oldKeys.forEach((k) => localStorage.removeItem(k));
      setProducts(mockProducts);
      setCategories(mockCategories);
      setRankings(mockRankings);
      setComparisons(mockComparisons);
      setArticles(mockArticles);
      setExperts(mockExperts);
    }
  }, []);

  const [products, setProducts] = useState<Product[]>(() => {
    if (localStorage.getItem('demo_data_version') !== DATA_VERSION) {
      return mockProducts;
    }
    const saved = localStorage.getItem(`demo_data_products_${DATA_VERSION}`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return mockProducts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    if (localStorage.getItem('demo_data_version') !== DATA_VERSION) {
      return mockCategories;
    }
    const saved = localStorage.getItem(`demo_data_categories_${DATA_VERSION}`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return mockCategories;
  });

  const [rankings, setRankings] = useState<Ranking[]>(() => {
    if (localStorage.getItem('demo_data_version') !== DATA_VERSION) {
      return mockRankings;
    }
    const saved = localStorage.getItem(`demo_data_rankings_${DATA_VERSION}`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return mockRankings;
  });

  const [comparisons, setComparisons] = useState<Comparison[]>(() => {
    if (localStorage.getItem('demo_data_version') !== DATA_VERSION) {
      return mockComparisons;
    }
    const saved = localStorage.getItem(`demo_data_comparisons_${DATA_VERSION}`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return mockComparisons;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    if (localStorage.getItem('demo_data_version') !== DATA_VERSION) {
      return mockArticles;
    }
    const saved = localStorage.getItem(`demo_data_articles_${DATA_VERSION}`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return mockArticles;
  });

  const [experts, setExperts] = useState<Expert[]>(() => {
    if (localStorage.getItem('demo_data_version') !== DATA_VERSION) {
      return mockExperts;
    }
    const saved = localStorage.getItem(`demo_data_experts_${DATA_VERSION}`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return mockExperts;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(`demo_data_products_${DATA_VERSION}`, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(`demo_data_categories_${DATA_VERSION}`, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(`demo_data_rankings_${DATA_VERSION}`, JSON.stringify(rankings));
  }, [rankings]);

  useEffect(() => {
    localStorage.setItem(`demo_data_comparisons_${DATA_VERSION}`, JSON.stringify(comparisons));
  }, [comparisons]);

  useEffect(() => {
    localStorage.setItem(`demo_data_articles_${DATA_VERSION}`, JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(`demo_data_experts_${DATA_VERSION}`, JSON.stringify(experts));
  }, [experts]);

  // Product Methods
  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'views'>) => {
    const newProduct: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      views: 1,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, ...updates, updatedAt: new Date().toISOString().split('T')[0] }
          : p
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Category Methods
  const addCategory = (catData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...catData,
      id: `cat-${Date.now()}`
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleCategoryStatus = (id: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'inactive' ? 'active' : 'inactive' } : c
      )
    );
  };

  // Ranking Methods
  const updateRanking = (id: string, updates: Partial<Ranking>) => {
    setRankings((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, ...updates, updatedAt: `${new Date().getDate()} Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}` }
          : r
      )
    );
  };

  const addRanking = (rankData: Omit<Ranking, 'id' | 'updatedAt'>) => {
    const newRanking: Ranking = {
      ...rankData,
      id: `rank-${Date.now()}`,
      updatedAt: `${new Date().getDate()} Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`
    };
    setRankings((prev) => [newRanking, ...prev]);
  };

  const deleteRanking = (id: string) => {
    setRankings((prev) => prev.filter((r) => r.id !== id));
  };

  // Article Methods
  const addArticle = (artData: Omit<Article, 'id' | 'publishedAt' | 'views'>) => {
    const newArt: Article = {
      ...artData,
      id: `art-${Date.now()}`,
      publishedAt: `${new Date().getDate()} Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`,
      views: 1
    };
    setArticles((prev) => [newArt, ...prev]);
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  // Comparison Methods
  const addComparison = (compData: Omit<Comparison, 'id' | 'updatedAt'>) => {
    const newComp: Comparison = {
      ...compData,
      id: `comp-${Date.now()}`,
      updatedAt: `${new Date().getDate()} Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`
    };
    setComparisons((prev) => [newComp, ...prev]);
  };

  const updateComparison = (id: string, updates: Partial<Comparison>) => {
    setComparisons((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteComparison = (id: string) => {
    setComparisons((prev) => prev.filter((c) => c.id !== id));
  };

  // Expert Methods
  const addExpert = (expData: Omit<Expert, 'id'>) => {
    const newExp: Expert = {
      ...expData,
      id: `expert-${Date.now()}`
    };
    setExperts((prev) => [...prev, newExp]);
  };

  const updateExpert = (id: string, updates: Partial<Expert>) => {
    setExperts((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const deleteExpert = (id: string) => {
    setExperts((prev) => prev.filter((e) => e.id !== id));
  };

  const resetData = () => {
    setProducts(mockProducts);
    setCategories(mockCategories);
    setRankings(mockRankings);
    setComparisons(mockComparisons);
    setArticles(mockArticles);
    setExperts(mockExperts);
    localStorage.setItem('demo_data_version', DATA_VERSION);
    localStorage.setItem(`demo_data_products_${DATA_VERSION}`, JSON.stringify(mockProducts));
    localStorage.setItem(`demo_data_categories_${DATA_VERSION}`, JSON.stringify(mockCategories));
    localStorage.setItem(`demo_data_rankings_${DATA_VERSION}`, JSON.stringify(mockRankings));
    localStorage.setItem(`demo_data_comparisons_${DATA_VERSION}`, JSON.stringify(mockComparisons));
    localStorage.setItem(`demo_data_articles_${DATA_VERSION}`, JSON.stringify(mockArticles));
    localStorage.setItem(`demo_data_experts_${DATA_VERSION}`, JSON.stringify(mockExperts));
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
