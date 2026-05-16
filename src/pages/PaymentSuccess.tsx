import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ref, get, update } from 'firebase/database';
import { db } from '../lib/firebase';
import { verifyUroPayPayment } from '../lib/uropay';
import { CheckCircle, Download } from 'lucide-react';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');
  const paymentId = searchParams.get('payment_id') || 'mock_pid_123';
  
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [accessData, setAccessData] = useState<{link: string, title: string} | null>(null);

  useEffect(() => {
    const verifyAndUnlock = async () => {
      if (!orderId) { setStatus('failed'); return; }

      try {
        // 1. Verify payment with secure backend
        const verification = await verifyUroPayPayment(orderId, paymentId);
        
        if (verification.success && verification.status === 'paid') {
          // 2. Fetch Order and Product to get Access Link
          const orderSnap = await get(ref(db, `orders/${orderId}`));
          if (!orderSnap.exists()) throw new Error("Order not found");
          
          const order = orderSnap.val();
          const productSnap = await get(ref(db, `products/${order.productId}`));
          const product = productSnap.val();

          // 3. Update Order Status in DB
          await update(ref(db, `orders/${orderId}`), {
            paymentStatus: 'paid',
            paymentId: paymentId,
            accessUnlocked: true
          });

          setAccessData({ link: product.accessLink, title: product.title });
          setStatus('success');
        } else {
          setStatus('failed');
        }
      } catch (error) {
        setStatus('failed');
      }
    };

    verifyAndUnlock();
  }, [orderId]);

  if (status === 'verifying') return <div className="text-center py-32 animate-pulse text-xl">Verifying your secure payment...</div>;

  if (status === 'failed') return (
     <div className="glass-panel max-w-md mx-auto p-8 text-center border-red-500/30">
       <div className="text-red-500 text-6xl mb-4 flex justify-center">⚠️</div>
       <h2 className="text-2xl font-bold text-white mb-2">Payment Failed or Pending</h2>
       <p className="text-gray-400 mb-6">We couldn't verify your payment instantly. If money was deducted, please check 'My Purchases' later or contact support.</p>
       <Link to="/contact" className="btn-secondary w-full">Contact Support</Link>
     </div>
  );

  return (
    <div className="glass-panel max-w-2xl mx-auto p-10 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-600"></div>
      <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
      <p className="text-gray-400 mb-8">Thank you for your purchase. Your digital product is ready.</p>
      
      <div className="bg-black/20 rounded-xl p-6 mb-8 border border-white/5">
        <h3 className="text-lg font-medium text-white mb-2">{accessData?.title}</h3>
        <p className="text-sm text-gray-500 mb-4">Order ID: {orderId}</p>
        <a href={accessData?.link} target="_blank" rel="noreferrer" className="btn-primary w-full py-4 text-lg animate-bounce">
          <Download className="w-6 h-6" /> Access / Download Product
        </a>
      </div>
      
      <p className="text-sm text-gray-500">A copy of this link has been connected to your email. You can access it anytime from the "My Purchases" page.</p>
    </div>
  );
}
