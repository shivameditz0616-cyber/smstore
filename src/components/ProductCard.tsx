import { Link } from 'react-router-dom';
import { PlayCircle, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="glass-panel group overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
      <div className="relative aspect-video overflow-hidden">
        <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <PlayCircle className="w-12 h-12 text-white/80" />
        </div>
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-primary">
          {product.category}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{product.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{product.shortDescription}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span className="text-2xl font-bold text-white">₹{product.price}</span>
          <Link to={`/product/${product.id}`} className="btn-primary py-2 px-4 text-sm">
            <ShoppingCart className="w-4 h-4" /> Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}
