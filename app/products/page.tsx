import { getProducts } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p className="text-gray-500 mt-2 text-sm">{products.length} products</p>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-400">No products yet. Import via DSers from AliExpress.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
