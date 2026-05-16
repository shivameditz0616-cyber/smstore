import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, get, set } from 'firebase/database';
import { db } from '../lib/firebase';
import { createUroPayOrder } from '../lib/uropay';
import toast from 'react-hot-toast';
import { ShieldCheck, CreditCard } from 'lucide-react';
import { Product } from '../types';

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (id) {
      get(ref(db, `products/${id}`)).then((snapshot) => {
        if (snapshot.exists()) setProduct({ id, ...snapshot.val() });
      });
    }
  }, [id]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setLoading(true);

    try {
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      const orderData = {
        orderId,
        ...formData,
        productId: product.id,
        productTitle: product.title,
        amount: product.price,
        paymentStatus: 'pending',
        accessUnlocked: false,
        createdAt: Date.now()
      };

      // 1. Create Pending Order in Firebase
      await set(ref(db, `orders/${orderId}`), orderData);

      // 2. Init Secure Payment (Backend Call Placeholder)
      const paymentRes = await createUroPayOrder(orderData);
      
      if (paymentRes.success && paymentRes.paymentUrl) {
        // 3. Redirect to Payment Gateway
        window.location.href = paymentRes.paymentUrl; 
      } else {
        throw new Error("Failed to initialize payment");
      }
    } catch (error) {
      toast.error("Payment initialization failed. Try again.");
      setLoading(false);
    }
  };

  if (!product) return <div className="text-center py-20 animate-pulse">Loading secure checkout...</div>;

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
      {/* Checkout Form */}
      <div className="glass-panel p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <ShieldCheck className="text-green-400" /> Secure Checkout
        </h2>
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Full Name</label>
            <input required type="text" className="glass-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email Address (For Delivery)</label>
            <input required type="email" className="glass-input" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">WhatsApp Number</label>
            <input required type="tel" className="glass-input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
          
          <div className="pt-4">
            <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-lg">
              {loading ? 'Processing Securely...' : `Pay ₹${product.price} Securely`}
              {!loading && <CreditCard className="ml-2 w-5 h-5" />}
            </button>
            <p className="text-xs text-center text-gray-500 mt-4">100% Safe & Secure Payments via UroPay</p>
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className="glass-panel p-8 h-fit">
        <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
        <div className="flex gap-4 mb-6">
          <img src={product.thumbnail} className="w-24 h-24 rounded-lg object-cover" />
          <div>
            <h4 className="text-white font-medium line-clamp-2">{product.title}</h4>
            <span className="text-primary text-sm">{product.category}</span>
          </div>
        </div>
        <div className="border-t border-white/10 pt-4 space-y-2">
          <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>₹{product.price}</span></div>
          <div className="flex justify-between text-gray-400"><span>Tax</span><span>₹0</span></div>
          <div className="flex justify-between text-white font-bold text-xl mt-4 pt-4 border-t border-white/10">
            <span>Total</span><span>₹{product.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
