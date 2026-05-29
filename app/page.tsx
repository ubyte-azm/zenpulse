import Link from 'next/link';
import { getProducts } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        <div className="relative max-w-4xl mx-auto px-6 py-32 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-6">
            Free shipping on orders over $50
          </span>
          <h1 className="text-6xl font-bold tracking-tight mb-5 leading-none">
            Tech that fits<br />
            <span className="text-gray-400">your life.</span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
            Curated gadgets for the modern lifestyle. Wireless, minimal, and built to keep up with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="bg-white text-black px-8 py-3.5 rounded-full font-semibold hover:bg-gray-100 transition text-sm"
            >
              Shop Now
            </Link>
            <Link
              href="/products"
              className="border border-gray-600 text-white px-8 py-3.5 rounded-full font-semibold hover:border-gray-400 transition text-sm"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/products" className="text-sm font-medium text-gray-500 hover:text-black transition">
            View all →
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-400">No products yet. Import via DSers from AliExpress.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Value props */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: '🚚', title: 'Free Shipping', desc: 'On all orders over $50' },
            { icon: '↩️', title: 'Easy Returns', desc: '30-day hassle-free returns' },
            { icon: '🔒', title: 'Secure Checkout', desc: 'Powered by Shopify' },
          ].map(({ icon, title, desc }) => (
            <div key={title}>
              <div className="text-2xl mb-2">{icon}</div>
              <p className="font-semibold text-sm">{title}</p>
              <p className="text-gray-500 text-sm mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
