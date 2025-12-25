// src/components/Products/ProductList.tsx

import { Filter, Loader, Plus, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { addProduct, deleteProduct, fetchCategories, fetchProducts, fetchProductsByCategory, updateProduct } from '../../services/api';
import { Product } from '../../types';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | undefined>();

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    useEffect(() => {
        filterProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, selectedCategory, products]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await fetchProducts();
            setProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {
        try {
            const data = await fetchCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    };

    const filterProducts = () => {
        let filtered = products;

        if (searchTerm) {
            filtered = filtered.filter(
                (product) =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter((product) => product.category === selectedCategory);
        }

        setFilteredProducts(filtered);
    };

    const handleCategoryChange = async (category: string) => {
        setSelectedCategory(category);
        if (category !== 'all') {
            try {
                setLoading(true);
                const data = await fetchProductsByCategory(category);
                setProducts(data);
            } catch (error) {
                console.error('Error loading products by category:', error);
            } finally {
                setLoading(false);
            }
        } else {
            loadProducts();
        }
    };

    const handleAddProduct = async (productData: Omit<Product, 'id'>) => {
        try {
            const newProduct = await addProduct(productData);
            setProducts([{ ...newProduct, id: Date.now() }, ...products]);
            setShowForm(false);

            // Success alert
            Swal.fire({
                icon: 'success',
                title: 'Product Added!',
                text: 'The product has been successfully added.',
                confirmButtonColor: '#4F46E5',
                timer: 2000,
                showConfirmButton: true,
            });
        } catch (error) {
            console.error('Error adding product:', error);

            // Error alert
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to add product. Please try again.',
                confirmButtonColor: '#4F46E5',
            });
        }
    };

    const handleUpdateProduct = async (productData: Product) => {
        try {
            await updateProduct(productData.id, productData);
            setProducts(products.map((p) => (p.id === productData.id ? productData : p)));
            setShowForm(false);
            setEditingProduct(undefined);

            // Success alert
            Swal.fire({
                icon: 'success',
                title: 'Product Updated!',
                text: 'The product has been successfully updated.',
                confirmButtonColor: '#4F46E5',
                timer: 2000,
                showConfirmButton: true,
            });
        } catch (error) {
            console.error('Error updating product:', error);

            // Error alert
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to update product. Please try again.',
                confirmButtonColor: '#4F46E5',
            });
        }
    };

    const handleDeleteProduct = async (id: number) => {
        // Confirmation alert
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                await deleteProduct(id);
                setProducts(products.filter((p) => p.id !== id));

                // Success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Product has been deleted successfully.',
                    confirmButtonColor: '#4F46E5',
                    timer: 2000,
                    showConfirmButton: true,
                });
            } catch (error) {
                console.error('Error deleting product:', error);

                // Error alert
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to delete product. Please try again.',
                    confirmButtonColor: '#4F46E5',
                });
            }
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingProduct(undefined);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader className="w-8 h-8 text-purple-600 animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Products</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                    <Plus className="w-5 h-5" />
                    Add Product
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white outline-none"
                        />
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white outline-none appearance-none"
                        >
                            <option value="all">All Categories</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No products found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={handleEdit}
                            onDelete={handleDeleteProduct}
                        />
                    ))}
                </div>
            )}

            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
                    onCancel={handleCloseForm}
                />
            )}
        </div>
    );
};

export default ProductList;