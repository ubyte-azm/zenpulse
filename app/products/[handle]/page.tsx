'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [adding, setAdding] = useState(false);
  const [cartUrl, setCartUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/products/${handle}`)
      .then(r => r.json())
      .then(data => {
        setProduct(data);
        setSelectedVariant(data?.variants?.edges?.[0]?.node);
      });
  }, [handle]);

  async function addToCart() {
    if (!selectedVariant) return;
    setAdding(true);
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variantId: selectedVariant.id, quantity: 1 }),
    });
    const cart = await res.json();
    setCartUrl(cart.checkoutUrl);
    setAdding(false);
  }

  if (!product) return <div className="p-16 text-center text-gray-400">Loading...</div>;

  const images = product.images.edges.map((e: any) => e.node);
  const variants = product.variants.edges.map((e: any) => e.node);

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          {images.map((img: any, i: number) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <img src={img.url} alt={img.altText || product.title} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="sticky top-8 self-start space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl font-semibold text-gray-800">
            {selectedVariant?.price?.currencyCode}{' '}
            {parseFloat(selectedVariant?.price?.amount || 0).toFixed(2)}
          </p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {variants.length > 1 && (
            <div>
              <p className="font-medium mb-2">Variant</p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v: any) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    disabled={!v.availableForSale}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                      selectedVariant?.id === v.id
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300 hover:border-black'
                    } ${!v.availableForSale ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={addToCart}
            disabled={adding || !selectedVariant?.availableForSale}
            className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {adding ? 'Adding...' : 'Add to Cart'}
          </button>

          {cartUrl && (
            <a href={cartUrl} className="block w-full text-center border border-black py-4 rounded-full font-semibold hover:bg-gray-50 transition">
              Checkout →
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
