// src/components/Products/ProductCard.tsx

import { Edit2, Star, Trash2 } from 'lucide-react';
import React from 'react';
import { Product } from '../../types';

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
            <div className="h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4">
                <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full">
                        {product.category}
                    </span>
                    {product.rating && (
                        <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium">{product.rating.rate}</span>
                        </div>
                    )}
                </div>

                <h3 className="font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 flex-1">
                    {product.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        ${product.price.toFixed(2)}
                    </span>

                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition"
                            title="Edit product"
                        >
                            <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => onDelete(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition"
                            title="Delete product"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;