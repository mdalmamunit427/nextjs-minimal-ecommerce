import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Create line items for Stripe Checkout
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: item.product.currency.toLowerCase(),
        product_data: {
          name: item.product.name,
          description: item.product.description,
          images: item.product.images || [item.product.image],
        },
        unit_amount: Math.round(item.product.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout Session
    // Store only essential item info in metadata (Stripe has 500 char limit per metadata value)
    const itemsSummary = items.map((item: any) => ({
      id: item.product.id,
      qty: item.quantity,
      color: item.selectedColor || '',
      size: item.selectedSize || '',
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/checkout/cancel`,
      metadata: {
        // Store only essential item IDs and quantities (within 500 char limit)
        items_count: items.length.toString(),
        items_summary: JSON.stringify(itemsSummary).substring(0, 450), // Keep under 500 chars
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

