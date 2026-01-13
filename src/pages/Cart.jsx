import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import products from '../data/products.json';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  if (!cartItems) return <div className="min-h-screen flex items-center justify-center dark:text-white">Loading Cart...</div>;

  const productsInCart = products.filter((product) => cartItems[product.id] > 0);

  if (totalAmount === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 transition-colors">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-full shadow-sm mb-6">
          <ShoppingBag className="w-16 h-16 text-slate-300 dark:text-slate-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Your cart is empty</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to="/shop" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors flex items-center gap-2">
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT: Cart Items List */}
          <div className="flex-grow space-y-4">
            {productsInCart.map((product) => (
              <div key={product.id} className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex gap-4 sm:gap-6 items-center transition-colors">
                
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center p-2 flex-shrink-0">
                  <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{product.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{product.category}</p>
                    </div>
                    <button onClick={() => updateCartItemCount(0, product.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 mt-4">
                    <div className="flex items-center bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                      <button onClick={() => removeFromCart(product.id)} className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                        <Minus className="w-4 h-4" />
                      </button>
                      <input 
                        className="w-12 text-center bg-transparent font-semibold text-slate-900 dark:text-white outline-none"
                        value={cartItems[product.id]}
                        onChange={(e) => updateCartItemCount(Number(e.target.value), product.id)}
                      />
                      <button onClick={() => addToCart(product.id)} className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-bold text-lg text-slate-900 dark:text-white">${(product.price * cartItems[product.id]).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 sticky top-24 transition-colors">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 border-b border-slate-100 dark:border-slate-700 pb-6">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Shipping Estimate</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Tax Estimate</span>
                  <span>${(totalAmount * 0.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-slate-900 dark:text-white mb-8">
                <span>Order Total</span>
                <span>${(totalAmount * 1.08).toFixed(2)}</span>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;