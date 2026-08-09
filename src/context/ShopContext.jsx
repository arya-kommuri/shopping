import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { useSound } from './SoundContext';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const { playClick, playAddToCart, playSuccess } = useSound();

  // Navigation & View State
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('prod-elec-1');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Wishlist State
  const [cart, setCart] = useState([
    { product: PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS[4], quantity: 2 }
  ]);
  const [wishlist, setWishlist] = useState(['prod-elec-2', 'prod-fresh-1']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState({ code: '', discountPercent: 0, isValid: false, message: '' });

  // Theme & Auth State
  const [theme, setTheme] = useState('dark');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState({
    isLoggedIn: true,
    name: 'Cyber Voyager',
    email: 'voyager@cybermart3d.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    vipLevel: 'Gold Cyber Tier',
    rewardPoints: 1450,
    addresses: [
      { id: 1, label: 'Home Base', street: '777 Quantum Avenue, Sector 9', city: 'Neo Cyberia', zip: '90210' }
    ]
  });

  // Orders State with initial mock order for tracking page demo
  const [orders, setOrders] = useState([
    {
      id: 'ORD-9842-CYBER',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [
        { product: PRODUCTS[0], quantity: 1 },
        { product: PRODUCTS[8], quantity: 1 }
      ],
      total: 1306.98,
      status: 'In Transit by Drone',
      step: 3,
      trackingNumber: 'CYBER-DRONE-88',
      estimatedDelivery: '18 minutes',
      address: '777 Quantum Avenue, Sector 9'
    }
  ]);

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  // Apply HTML theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    playClick();
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (title, message, type = 'cyan') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Page Routing Helper
  const navigateTo = (page, productId = null, categoryId = null) => {
    playClick();
    if (productId) setSelectedProductId(productId);
    if (categoryId !== undefined) setActiveCategory(categoryId);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Operations
  const addToCart = (product, quantity = 1) => {
    playAddToCart();
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast('Added to Cart', `${product.name} (x${quantity}) added to your shopping cart.`, 'cyan');
  };

  const removeFromCart = (productId) => {
    playClick();
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item Removed', 'Product removed from shopping cart.', 'rose');
  };

  const updateQuantity = (productId, delta) => {
    playClick();
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Operations
  const toggleWishlist = (productId) => {
    playClick();
    setWishlist(prev => {
      const isSaved = prev.includes(productId);
      if (isSaved) {
        showToast('Removed from Wishlist', 'Item removed from saved favorites.', 'rose');
        return prev.filter(id => id !== productId);
      } else {
        const prod = PRODUCTS.find(p => p.id === productId);
        showToast('Saved to Wishlist', `${prod ? prod.name : 'Product'} added to your wishlist.`, 'purple');
        return [...prev, productId];
      }
    });
  };

  // Promo Code Validation
  const applyPromoCode = (code) => {
    playClick();
    const clean = code.trim().toUpperCase();
    if (clean === 'FUTURE15') {
      setPromoCode({ code: clean, discountPercent: 15, isValid: true, message: '15% Cyber Discount Applied!' });
      showToast('Promo Code Applied', '15% discount has been applied to your subtotal!', 'emerald');
    } else if (clean === 'SUPER3D' || clean === 'CYBER20') {
      setPromoCode({ code: clean, discountPercent: 20, isValid: true, message: '20% VIP Cyber Discount Applied!' });
      showToast('VIP Promo Code Applied', '20% discount has been applied to your subtotal!', 'emerald');
    } else {
      setPromoCode({ code: clean, discountPercent: 0, isValid: false, message: 'Invalid or Expired Code' });
      showToast('Invalid Code', 'Try FUTURE15 or CYBER20 for discounts.', 'rose');
    }
  };

  // Checkout & Place Order
  const placeOrder = (shippingInfo, paymentMethod) => {
    playSuccess();
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discountAmount = (subtotal * promoCode.discountPercent) / 100;
    const shippingFee = subtotal > 50 ? 0 : 9.99;
    const finalTotal = subtotal - discountAmount + shippingFee;

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}-CYBER`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      total: parseFloat(finalTotal.toFixed(2)),
      status: 'Order Dispatched by Drone',
      step: 2,
      trackingNumber: `CYBER-DRONE-${Math.floor(10 + Math.random() * 90)}`,
      estimatedDelivery: '25 minutes',
      address: `${shippingInfo.street}, ${shippingInfo.city}`,
      paymentMethod
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setPromoCode({ code: '', discountPercent: 0, isValid: false, message: '' });
    showToast('Order Placed Successfully!', `Order #${newOrder.id} confirmed. Tracking live drone delivery now.`, 'emerald');
    navigateTo('tracking');
  };

  // Computed Cart Metrics
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (cartSubtotal * promoCode.discountPercent) / 100;
  const freeShippingThreshold = 75;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const cartTotal = cartSubtotal - discountAmount + (isFreeShipping ? 0 : 9.99);
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        PRODUCTS,
        activePage,
        navigateTo,
        selectedProductId,
        setSelectedProductId,
        quickViewProduct,
        setQuickViewProduct,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        discountAmount,
        cartTotal,
        totalItemCount,
        freeShippingThreshold,
        isFreeShipping,
        wishlist,
        toggleWishlist,
        isCartOpen,
        setIsCartOpen,
        isAuthOpen,
        setIsAuthOpen,
        user,
        setUser,
        theme,
        toggleTheme,
        toasts,
        showToast,
        promoCode,
        applyPromoCode,
        orders,
        placeOrder
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
