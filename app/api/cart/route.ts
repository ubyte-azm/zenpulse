import { NextRequest, NextResponse } from 'next/server';
import { createCart } from '@/lib/shopify';

export async function POST(req: NextRequest) {
  const { variantId, quantity } = await req.json();
  const cart = await createCart(variantId, quantity);
  return NextResponse.json(cart);
}
