import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Test Product" },
            unit_amount: 2000, // $20.00
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/success`,  // Redirect to success page
      cancel_url: `${req.headers.origin}/cancel`,    // Redirect to cancel page
    });

    res.status(200).json({ sessionUrl: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
