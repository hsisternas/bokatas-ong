import React from 'react';
import type { Category } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onSelectCategory }) => {
  const { locale } = useTranslation();
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
      {categories.map((category, index) => (
        <div
          key={category.id}
          onClick={() => onSelectCategory(category)}
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && onSelectCategory(category)}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 ease-out cursor-pointer p-4 flex flex-col items-center justify-center gap-2 aspect-square hover:scale-105 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-background opacity-0 fade-in-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="text-primary">
            <category.icon className="text-3xl" />
          </div>
          <h2 className="text-text-main font-medium text-center text-[0.95rem] leading-tight">{category.name[locale]}</h2>
          <p className="text-text-light text-center text-xs mt-1 hidden sm:block">{category.description[locale]}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;