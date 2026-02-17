import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import { fetchProducts, type Product } from '../api';

const CATEGORIES = ['All', 'Cameras', 'Drones', 'Outdoors', 'Gaming', 'Tools'];

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        fetchProducts()
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (activeCategory === 'All') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => p.category === activeCategory));
        }
    }, [activeCategory, products]);

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <HeroSection />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="products">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Rentals</h2>

                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {CATEGORIES.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveCategory(filter)}
                                className={`px-5 py-2 rounded-full border text-sm font-medium transition whitespace-nowrap ${activeCategory === filter
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="h-96 bg-gray-200 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <>
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                                <p className="text-gray-500 text-lg">No products found in this category.</p>
                                <button
                                    onClick={() => setActiveCategory('All')}
                                    className="mt-4 text-blue-600 font-medium hover:underline"
                                >
                                    View all products
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
