import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Shield, Clock, CreditCard } from 'lucide-react';
import products from '../data/products.json';

const Home = () => {
  const trendingProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">Lifestyle</span>
            </h1>
            <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto">
              Discover the most premium collection of electronics, fashion, and home essentials. 
              Experience shopping nirvana at ZenCartopia.
            </p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Start Shopping <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 2. FEATURES GRID */}
      <div className="bg-white dark:bg-slate-900 py-12 border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <FeatureCard icon={<Truck className="w-8 h-8 text-accent" />} title="Free Shipping" desc="On all orders over $50" />
            <FeatureCard icon={<Shield className="w-8 h-8 text-accent" />} title="Secure Payment" desc="100% protected transactions" />
            <FeatureCard icon={<Clock className="w-8 h-8 text-accent" />} title="Fast Delivery" desc="Receive within 48 hours" />
            <FeatureCard icon={<CreditCard className="w-8 h-8 text-accent" />} title="Easy Returns" desc="30-day money back guarantee" />
          </div>
        </div>
      </div>

      {/* 3. TRENDING PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Trending Now</h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="group">
              <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700">
                <div className="relative overflow-hidden aspect-square">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="p-6">
                  <p className="text-sm text-accent font-semibold mb-2">{product.category}</p>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 truncate">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">${product.price}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-accent transition-colors flex items-center gap-1">
                      View Details <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/shop" className="inline-block border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white px-8 py-3 rounded-full font-semibold hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors">
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
    <div className="bg-accent/10 p-3 rounded-lg">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
    </div>
  </div>
);

export default Home;