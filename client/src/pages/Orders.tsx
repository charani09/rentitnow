import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchOrders, type Order } from '../api';
import { Package, Calendar, ArrowRight } from 'lucide-react';

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders()
            .then(setOrders)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading your orders...</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                    <Package size={32} />
                </div>
                <h1 className="text-3xl font-bold mb-4">No Orders Yet</h1>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't rented any gear yet. Start your adventure today!</p>
                <Link to="/" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
                    Browse Catalog <ArrowRight size={18} />
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Package className="text-blue-600" /> My Orders
            </h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                        <div className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                            <div className="flex gap-4 items-center">
                                <img
                                    src={order.product?.imageUrl || 'https://via.placeholder.com/150'}
                                    alt={order.product?.name}
                                    className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{order.product?.name || 'Unknown Product'}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                                order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                        <span>•</span>
                                        <span>Order #{order.id}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:items-end gap-1">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span className="text-sm">
                                        {new Date(order.startDate).toLocaleDateString()} — {new Date(order.endDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="font-bold text-xl text-gray-900 mt-2">
                                    ₹{order.totalPrice?.toFixed(0)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
