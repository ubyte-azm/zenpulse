import Link from 'next/link';

type Product = {
  id: string;
  title: string;
  handle: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: { node: { url: string; altText: string | null } }[] };
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$', GBP: '£', EUR: '€', AUD: 'A$', CAD: 'C$', SGD: 'S$', MYR: 'RM',
};

export default function ProductCard({ product }: { product: Product }) {
  const { amount, currencyCode } = product.priceRange.minVariantPrice;
  const symbol = CURRENCY_SYMBOLS[currencyCode] ?? currencyCode + ' ';
  const price = `${symbol}${parseFloat(amount).toFixed(2)}`;
  const image = product.images.edges[0]?.node;

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-3">
        {image && (
          <img
            src={image.url}
            alt={image.altText || product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
          <span className="bg-white text-black text-sm font-semibold px-5 py-2 rounded-full shadow-lg">
            View Product
          </span>
        </div>
      </div>
      <h3 className="font-medium text-gray-900 text-sm leading-snug line-clamp-2 mb-1">
        {product.title}
      </h3>
      <p className="text-gray-800 font-semibold text-sm">{price}</p>
    </Link>
  );
}
