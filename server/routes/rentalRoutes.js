const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

// GET /products: Fetch all products with their booked dates
router.get('/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                orders: {
                    select: {
                        startDate: true,
                        endDate: true,
                        status: true,
                    },
                    where: {
                        status: 'CONFIRMED',
                        endDate: {
                            gte: new Date(), // Only fetch future/current bookings
                        },
                    },
                },
            },
        });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// GET /orders: Fetch all orders (simple history for MVP)
router.get('/orders', async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                product: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// POST /orders: Create an order with availability check
router.post('/orders', async (req, res) => {
    const { productId, startDate, endDate } = req.body;

    if (!productId || !startDate || !endDate) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Basic validation check
    if (start > end) {
        return res.status(400).json({ error: 'Start date cannot be after end date' });
    }

    try {
        // Transactional check and create
        const result = await prisma.$transaction(async (prisma) => {
            // 1. Check for overlapping bookings
            // Formula: (RequestStart <= ExistingEnd) && (RequestEnd >= ExistingStart)
            const overlappingOrders = await prisma.order.findMany({
                where: {
                    productId: parseInt(productId),
                    status: 'CONFIRMED',
                    AND: [
                        { startDate: { lte: end } },
                        { endDate: { gte: start } },
                    ],
                },
            });

            if (overlappingOrders.length > 0) {
                throw new Error('Product is not available for the selected dates');
            }

            // 2. Calculate price
            const product = await prisma.product.findUnique({
                where: { id: parseInt(productId) },
            });

            if (!product) {
                throw new Error('Product not found');
            }

            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; // Inclusive days
            const totalPrice = days * product.pricePerDay;

            // 3. Create the order
            const newOrder = await prisma.order.create({
                data: {
                    productId: parseInt(productId),
                    startDate: start,
                    endDate: end,
                    totalPrice: totalPrice,
                    status: 'CONFIRMED',
                },
            });

            return newOrder;
        });

        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating order:', error);
        if (error.message === 'Product is not available for the selected dates') {
            res.status(409).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to create order' });
        }
    }
});

module.exports = router;
