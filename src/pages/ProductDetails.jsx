import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import products from '../data/products.json';
import { Star, ShoppingCart, Truck, Shield, ArrowLeft, Check } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const context = useContext(ShopContext);
  const [isAdded, setIsAdded] = useState(false);

  if (!context) return <div>Error</div>;
  const { addToCart, cartItems } = context;
  const product = products.find((p) => p.id === Number(id));

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!product) return <div>Not Found</div>;

  const cartAmount = cartItems ? cartItems[product.id] : 0;

  const handleAddToCart = () => {
    addToCart(product.id);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto">
        <Link to="/shop" className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Shop
        </Link>

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            
            <div className="relative h-[400px] md:h-[600px] bg-slate-50 dark:bg-slate-700 flex items-center justify-center p-8">
              <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain drop-shadow-xl" />
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2">{product.category}</span>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{product.name}</h1>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-6">${product.price}</div>
              
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8 border-b border-slate-100 dark:border-slate-700 pb-8">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 px-8 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    isAdded 
                    ? 'bg-green-600 text-white' 
                    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200'
                  }`}
                >
                  {isAdded ? "Added!" : "Add to Cart"} <ShoppingCart className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2"><Truck className="text-accent"/> Fast Delivery</div>
                <div className="flex items-center gap-2"><Shield className="text-accent"/> Secure Payment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;