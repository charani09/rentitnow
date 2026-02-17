import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts, createOrder, type Product } from '../api';
import { Calendar, CheckCircle, AlertCircle } from 'lucide-react';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Ideally use getProductById, but filtering for now
        fetchProducts().then(products => {
            const found = products.find(p => p.id === Number(id));
            if (found) setProduct(found);
        });
    }, [id]);

    const handleRent = async () => {
        if (!product || !startDate || !endDate) return;

        // Basic client validation
        if (new Date(startDate) > new Date(endDate)) {
            setError('Invalid date range');
            return;
        }

        try {
            await createOrder(product.id, startDate, endDate);
            setSuccess('Order placed successfully!');
            setTimeout(() => navigate('/orders'), 2000); // Redirect logic
        } catch (err: any) {
            setError(err.message || 'Booking failed');
        }
    };

    if (!product) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image Section */}
                <div className="rounded-2xl overflow-hidden shadow-xl h-[500px]">
                    <img
                        src={product.imageUrl || 'https://via.placeholder.com/600'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Details Section */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    <p className="text-blue-600 text-3xl font-bold mb-6">₹{product.pricePerDay}<span className="text-lg text-gray-500 font-normal">/day</span></p>

                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        {product.description || "Experience top-tier quality with this rental. Perfect for your specific needs and maintained to the highest standards."}
                    </p>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Calendar className="text-blue-600" size={20} /> Select Dates
                        </h3>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">End Date</label>
                                <input
                                    type="date"
                                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Duration</span>
                                <span className="font-medium">
                                    {startDate && endDate && new Date(startDate) <= new Date(endDate)
                                        ? `${Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} days`
                                        : '-'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                <span className="text-gray-900 font-bold">Total Price</span>
                                <span className="text-2xl font-bold text-blue-600">
                                    {startDate && endDate && new Date(startDate) <= new Date(endDate)
                                        ? `₹${(Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1) * product.pricePerDay}`
                                        : '₹0'}
                                </span>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg mb-4">
                                <AlertCircle size={18} /> {error}
                            </div>
                        )}

                        {success && (
                            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg mb-4">
                                <CheckCircle size={18} /> {success}
                            </div>
                        )}

                        <button
                            onClick={handleRent}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg transform active:scale-95"
                        >
                            Confirm Rental
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
