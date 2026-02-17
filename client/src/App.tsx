import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Orders from './pages/Orders';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>

        {/* Simple Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-400">© 2024 RentItNow. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
