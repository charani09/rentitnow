const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.order.deleteMany();
        await prisma.product.deleteMany();
        console.log('Cleared existing data.');
    } catch (e) {
        console.log('First run or cleanup failed, continuing...');
    }

    const products = [
        // Cameras & Drones
        {
            name: 'Sony Alpha a7 IV',
            description: 'A full-frame mirrorless camera that does it all. Perfect for professionals and enthusiasts.',
            pricePerDay: 85.0,
            imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            category: 'Cameras'
        },
        {
            name: 'DJI Mavic 3 Cine',
            description: 'Capture stunning aerial footage with this professional-grade drone featuring Hasselblad optics.',
            pricePerDay: 120.0,
            imageUrl: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            category: 'Drones'
        },

        // Outdoors
        {
            name: 'Specialized Stumpjumper',
            description: 'Top-tier trail bike for mountain biking adventures. Full suspension and lightweight frame.',
            pricePerDay: 45.0,
            imageUrl: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            category: 'Outdoors'
        },
        {
            name: 'North Face 4-Season Tent',
            description: 'Expedition-quality tent for 4 people. Withstand the elements in comfort.',
            pricePerDay: 35.0,
            imageUrl: 'https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            category: 'Outdoors'
        },

        // Electronics & Gaming
        {
            name: 'PlayStation 5 Console',
            description: 'Next-gen gaming console. Includes 2 controllers and pre-installed hit games.',
            pricePerDay: 25.0,
            imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            category: 'Gaming'
        },
        {
            name: 'Meta Quest 3 VR Headset',
            description: 'Immersive mixed reality headset for gaming and experiences.',
            pricePerDay: 40.0,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Meta_Quest_3_display.jpg', // Official-like image
            category: 'Gaming'
        },

        // Tools
        {
            name: 'Makita Cordless Drill Set',
            description: 'High-performance drill set for all your DIY and home improvement needs.',
            pricePerDay: 15.0,
            imageUrl: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', // Electric Drill
            category: 'Tools'
        },
        {
            name: 'Karcher Pressure Washer',
            description: 'Powerful pressure washer for cleaning driveways, cars, and patios.',
            pricePerDay: 20.0,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Karcher_pressure_washer_K_MINI.webp',
            category: 'Tools'
        }
    ];

    console.log('Start seeding ...');
    for (const p of products) {
        await prisma.product.create({
            data: p,
        });
    }
    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
