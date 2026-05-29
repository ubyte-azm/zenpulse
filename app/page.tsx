import Link from 'next/link';
import { getProducts } from '@/lib/shopify';

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-black text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-4">Zenpulse</h1>
        <p className="text-lg text-gray-400 mb-8">Tech that fits your life.</p>
        <Link href="/products" className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
          Shop Now
        </Link>
      </section>

      {/* Products */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No products yet. Add some from your Shopify admin or import via DSers.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <Link key={product.id} href={`/products/${product.handle}`} className="group">
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-3">
                  {product.images.edges[0] && (
                    <img
                      src={product.images.edges[0].node.url}
                      alt={product.images.edges[0].node.altText || product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  )}
                </div>
                <h3 className="font-medium text-gray-900 truncate">{product.title}</h3>
                <p className="text-gray-500 text-sm mt-1">
                  {product.priceRange.minVariantPrice.currencyCode}{' '}
                  {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
