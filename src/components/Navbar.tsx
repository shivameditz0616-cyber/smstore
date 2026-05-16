import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 glass-panel border-b border-white/10 bg-[#0B0D17]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            SM Store
          </Link>
          <div className="flex gap-6 items-center">
            <Link to="/my-purchases" className="text-gray-300 hover:text-white flex items-center gap-2 font-medium transition-colors">
              <ShoppingBag size={18} /> <span className="hidden md:inline">My Purchases</span>
            </Link>
            <Link to="/admin/login" className="text-gray-400 hover:text-white transition-colors">
              <ShieldCheck size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
