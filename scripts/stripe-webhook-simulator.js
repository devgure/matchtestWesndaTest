// scripts/stripe-webhook-simulator.js
const crypto = require('crypto');
const axios = require('axios');

// Simulate a Stripe webhook event
function createWebhookEvent(payload, secret) {
  const payloadString = JSON.stringify(payload);
  const sig = crypto
    .createHmac('sha256', secret)
    .update(payloadString, 'utf8')
    .digest('hex');

  return {
    headers: {
      'stripe-signature': `t=1234567890,v1=${sig}`,
    },
    body: payloadString,
  };
}

// Simulate successful subscription
async function testStripeWebhook() {
  const event = createWebhookEvent(
    {
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_xxxxx',
          client_reference_id: 'user_123',
          subscription: 'sub_xxxxx',
          expires_at: Math.floor(Date.now() / 1000) + 86400 * 30,
        },
      },
    },
    process.env.STRIPE_WEBHOOK_SECRET
  );

  try {
    const res = await axios.post('http://localhost:3000/subscription/webhook', event.body, {
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': event.headers['stripe-signature'],
      },
    });
    console.log('✅ Webhook simulation successful:', res.data);
  } catch (err) {
    console.error('❌ Webhook failed:', err.response?.data || err.message);
  }
}

testStripeWebhook();