import { ShoppingCart } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-purple-400">
        🚀 #1 Platform for Digital Creators
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
        Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Digital Assets</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
        Buy high-quality reels packs, premium courses, video templates, and editing packs. Get instant access directly after secure payment.
      </p>
      <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white font-medium py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] flex items-center justify-center gap-2 text-lg active:scale-95">
        <ShoppingCart className="w-5 h-5" /> Browse Products
      </button>
    </div>
  );
}
