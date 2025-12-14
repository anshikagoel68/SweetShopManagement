import React, { createContext, useContext, useState, useCallback } from 'react';
import { Sweet, SortConfig } from '@/types/sweet';
import { initialSweets } from '@/data/sweets';
import { toast } from 'sonner';

interface SweetContextType {
  sweets: Sweet[];
  addSweet: (sweet: Omit<Sweet, 'id'>) => void;
  updateSweet: (id: string, sweet: Partial<Sweet>) => void;
  deleteSweet: (id: string) => void;
  purchaseSweet: (id: string, quantity: number) => boolean;
  restockSweet: (id: string, quantity: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortConfig: SortConfig;
  setSortConfig: (config: SortConfig) => void;
  filteredSweets: Sweet[];
}

const SweetContext = createContext<SweetContextType | undefined>(undefined);

export const SweetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sweets, setSweets] = useState<Sweet[]>(initialSweets);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'name', order: 'asc' });

  const addSweet = useCallback((sweet: Omit<Sweet, 'id'>) => {
    const newSweet: Sweet = {
      ...sweet,
      id: Date.now().toString(),
    };
    setSweets(prev => [...prev, newSweet]);
    toast.success(`${sweet.name} added successfully!`);
  }, []);

  const updateSweet = useCallback((id: string, updates: Partial<Sweet>) => {
    setSweets(prev => prev.map(sweet => 
      sweet.id === id ? { ...sweet, ...updates } : sweet
    ));
    toast.success('Sweet updated successfully!');
  }, []);

  const deleteSweet = useCallback((id: string) => {
    const sweet = sweets.find(s => s.id === id);
    setSweets(prev => prev.filter(sweet => sweet.id !== id));
    toast.success(`${sweet?.name} removed from inventory`);
  }, [sweets]);

  const purchaseSweet = useCallback((id: string, quantity: number): boolean => {
    const sweet = sweets.find(s => s.id === id);
    if (!sweet) return false;
    
    if (sweet.quantity < quantity) {
      toast.error(`Only ${sweet.quantity} ${sweet.name} available in stock`);
      return false;
    }
    
    setSweets(prev => prev.map(s => 
      s.id === id ? { ...s, quantity: s.quantity - quantity } : s
    ));
    toast.success(`Purchased ${quantity} ${sweet.name}!`);
    return true;
  }, [sweets]);

  const restockSweet = useCallback((id: string, quantity: number) => {
    const sweet = sweets.find(s => s.id === id);
    setSweets(prev => prev.map(s => 
      s.id === id ? { ...s, quantity: s.quantity + quantity } : s
    ));
    toast.success(`Restocked ${quantity} ${sweet?.name}`);
  }, [sweets]);

  const filteredSweets = React.useMemo(() => {
    let result = [...sweets];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(sweet => 
        sweet.name.toLowerCase().includes(term) ||
        sweet.category.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(sweet => sweet.category === selectedCategory);
    }

    // Sort
    result.sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.order === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.order === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    return result;
  }, [sweets, searchTerm, selectedCategory, sortConfig]);

  return (
    <SweetContext.Provider value={{
      sweets,
      addSweet,
      updateSweet,
      deleteSweet,
      purchaseSweet,
      restockSweet,
      searchTerm,
      setSearchTerm,
      selectedCategory,
      setSelectedCategory,
      sortConfig,
      setSortConfig,
      filteredSweets,
    }}>
      {children}
    </SweetContext.Provider>
  );
};

export const useSweets = () => {
  const context = useContext(SweetContext);
  if (!context) {
    throw new Error('useSweets must be used within a SweetProvider');
  }
  return context;
};
