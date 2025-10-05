
import React from 'react';

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="bg-neutral p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white mb-3">Catégories</h3>
            <ul className="space-y-2">
                {categories.map(category => (
                    <li key={category}>
                        <button
                            onClick={() => onSelectCategory(category)}
                            className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                                selectedCategory === category
                                    ? 'bg-primary text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                        >
                            {category === 'all' ? 'Toutes les catégories' : category}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryFilter;
