import { NextRequest, NextResponse } from 'next/server';
import { getProduct } from '@/lib/shopify';

export async function GET(_: NextRequest, { params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}
