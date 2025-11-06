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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => onSelectCategory(category)}
          className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer p-4 flex flex-col items-center justify-center aspect-square"
        >
          <div className="text-[#22A9DF] mb-2">
            <category.icon className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>
          <h2 className="text-gray-800 font-semibold text-center text-sm sm:text-base">{category.name[locale]}</h2>
          <p className="text-gray-500 text-center text-xs sm:text-sm mt-1 hidden sm:block">{category.description[locale]}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;