import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { cartItems } = await req.json(); // Get cart items from request

    if (!cartItems || cartItems.length === 0) {
      return new Response(JSON.stringify({ error: "Cart is empty" }), { status: 400 });
    }

    // Convert cart items to Stripe format
    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name }, // Use actual product name
        unit_amount: Math.round(item.price * 100), // Convert price to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return new Response(JSON.stringify({ sessionUrl: session.url }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
