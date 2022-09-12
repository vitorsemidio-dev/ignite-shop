// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { CartDetails } from "use-shopping-cart/core";
import { stripe } from "../../lib/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const cartDetails = req.body.cartDetails as CartDetails;
  const lineItems = Object.values(cartDetails).map((cartItem) => ({
    price: (cartItem.price_data as Stripe.Price).id,
    quantity: cartItem.quantity,
  }));

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelsUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: cancelsUrl,
    success_url: successUrl,
    mode: "payment",
    line_items: lineItems,
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
