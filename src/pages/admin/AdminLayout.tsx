import { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, db } from '../../lib/firebase';
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const adminSnap = await get(ref(db, `admins/${user.uid}`));
        if (adminSnap.exists() && adminSnap.val().role === 'admin') {
          setIsAdmin(true);
        } else {
          await signOut(auth);
          navigate('/admin/login');
        }
      } else {
        navigate('/admin/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center">Loading admin...</div>;
  if (!isAdmin) return null;

  return (
    <div className="flex h-screen bg-background text-gray-200">
      {/* Sidebar */}
      <aside className="w-64 glass-panel m-4 rounded-3xl flex flex-col hidden md:flex">
        <div className="p-6 pb-2 border-b border-white/10">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">SM Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"><LayoutDashboard size={20}/> Dashboard</Link>
          <Link to="/admin/products" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"><Package size={20}/> Products</Link>
          <Link to="/admin/orders" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"><ShoppingCart size={20}/> Orders</Link>
          <Link to="/admin/settings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"><Settings size={20}/> Settings/Pages</Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={() => signOut(auth)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/20 text-red-400 w-full transition-colors"><LogOut size={20}/> Logout</button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
