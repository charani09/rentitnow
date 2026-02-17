import { Link } from 'react-router-dom';
import { type Product } from '../api';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'; // Fallback to "Real Estate/Rental" generic image
                    }}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm uppercase tracking-wider">
                    {product.category || 'Rental'}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg text-white font-semibold shadow-sm">
                    ₹{product.pricePerDay}/day
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mt-4">
                    <Link
                        to={`/product/${product.id}`}
                        className="w-full text-center bg-gray-900 hover:bg-black text-white px-4 py-3 rounded-lg font-medium transition-colors"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
