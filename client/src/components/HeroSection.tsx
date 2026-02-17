export default function HeroSection() {
    return (
        <div className="relative bg-gray-900 text-white overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1558981806-ec527fa84c3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Rental Background"
                    className="w-full h-full object-cover opacity-30"
                />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                    Rent Premium Gear <br className="hidden md:block" />
                    <span className="text-blue-400">Without the Full Price</span>
                </h1>
                <p className="mt-4 max-w-xl text-xl text-gray-300 mb-8">
                    Access high-end cameras, bikes, camping equipment, and more.
                    Standardize your adventures with premium rentals at affordable daily rates.
                </p>
                <div className="flex gap-4">
                    <a href="#products" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Browse Catalog
                    </a>
                </div>
            </div>
        </div>
    );
}
