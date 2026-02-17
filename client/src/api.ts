const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/rentals';

export interface Product {
    id: number;
    name: string;
    description: string | null;
    pricePerDay: number;
    imageUrl: string | null;
    category: string; // New field
    orders: Order[];
}

export interface Order {
    id: number;
    productId: number;
    startDate: string; // ISO string
    endDate: string;   // ISO string
    status: string;
    totalPrice: number;
    product?: Product;
    createdAt: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
};

export const fetchOrders = async (): Promise<Order[]> => {
    const response = await fetch(`${API_URL}/orders`);
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    return response.json();
};

export const createOrder = async (productId: number, startDate: string, endDate: string) => {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, startDate, endDate }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
    }
    return response.json();
};
