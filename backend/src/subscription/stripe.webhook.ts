// backend/src/subscription/stripe.webhook.ts
import { Request, Response } from 'express';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

export const stripeWebhook = (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    prisma.subscription.create({
      data: {
        stripeId: session.subscription,
        userId: session.client_reference_id,
        plan: 'gold',
        status: 'active',
        currentPeriodEnd: new Date(session.expires_at * 1000),
      },
    });

    // Grant premium features
    await prisma.user.update({
      where: { id: session.client_reference_id },
      data: { isPremium: true, premiumTier: 'gold' },
    });
  }

  res.json({ received: true });
};