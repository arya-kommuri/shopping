import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { SoundProvider } from './context/SoundContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { QuickViewModal } from './components/QuickViewModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { ProfilePage } from './pages/ProfilePage';

const AppContent = () => {
  const { activePage } = useShop();

  const renderPage = () => {
    switch (activePage) {
      case 'shop':
        return <ShopPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'tracking':
        return <OrderTrackingPage />;
      case 'profile':
        return <ProfilePage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />

      {/* Global Modals & Notifications */}
      <Toast />
      <CartDrawer />
      <AuthModal />
      <QuickViewModal />
    </div>
  );
};

export function App() {
  return (
    <SoundProvider>
      <ShopProvider>
        <AppContent />
      </ShopProvider>
    </SoundProvider>
  );
}

export default App;
