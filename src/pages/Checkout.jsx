import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { CheckCircle, CreditCard, MapPin, User, ShieldCheck, Loader2 } from 'lucide-react';

const Checkout = () => {
  const { getTotalCartAmount, cartItems, products } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOrderPlaced(true);
      localStorage.removeItem('shop-cart'); 
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 transition-colors">
        <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl text-center max-w-md w-full border border-slate-100 dark:border-slate-700">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Order Confirmed!</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Thank you for your purchase. Your order has been received.
          </p>
          <button onClick={() => { window.location.href = "/" }} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Helper for Input styles
  const inputStyle = "w-full p-3 bg-slate-50 dark:bg-slate-700 dark:text-white rounded-lg border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent/50";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <User className="text-accent" /> Contact Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="First Name" className={inputStyle} />
                  <input required type="text" placeholder="Last Name" className={inputStyle} />
                </div>
                <input required type="email" placeholder="Email Address" className={inputStyle} />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <MapPin className="text-accent" /> Shipping Address
              </h2>
              <div className="space-y-4">
                <input required type="text" placeholder="Address" className={inputStyle} />
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="City" className={inputStyle} />
                  <input required type="text" placeholder="ZIP Code" className={inputStyle} />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <CreditCard className="text-accent" /> Payment Details
              </h2>
              <div className="space-y-4">
                <input required type="text" placeholder="Card Number" className={inputStyle} />
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="MM / YY" className={inputStyle} />
                  <input required type="text" placeholder="CVC" className={inputStyle} />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : `Pay $${(totalAmount * 1.08).toFixed(2)}`}
            </button>
          </form>

          <div className="hidden lg:block">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Your Order</h2>
              <div className="space-y-4 mb-6">
                {products.map((product) => {
                  if (cartItems[product.id] !== 0) {
                    return (
                      <div key={product.id} className="flex items-center gap-4 py-2 border-b border-slate-50 dark:border-slate-700 last:border-0">
                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-700 rounded-lg flex items-center justify-center p-1">
                          <img src={product.image} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-bold text-sm text-slate-900 dark:text-white">{product.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Qty: {cartItems[product.id]}</p>
                        </div>
                        <p className="font-bold text-slate-900 dark:text-white">${(product.price * cartItems[product.id]).toFixed(2)}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              
              <div className="border-t border-slate-100 dark:border-slate-700 pt-6 space-y-2 text-slate-600 dark:text-slate-400">
                <div className="flex justify-between"><span>Subtotal</span><span>${totalAmount.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Tax (8%)</span><span>${(totalAmount * 0.08).toFixed(2)}</span></div>
                <div className="flex justify-between text-xl font-bold text-slate-900 dark:text-white pt-4">
                  <span>Total</span><span>${(totalAmount * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;