// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { priceId } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!priceId) {
    return res.status(400).json({ error: "priceId is required" });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelsUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: cancelsUrl,
    success_url: successUrl,
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
