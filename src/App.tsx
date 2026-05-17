import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#0B0D17] text-white">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Baaki ke pages (Admin, Checkout, Product) hum ek-ek karke yahan add karenge */}
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
