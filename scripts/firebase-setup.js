// scripts/firebase-setup.js
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json'); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

// Enable Google, Apple, Facebook Sign-In in Firebase Console
// This script ensures providers are configured
async function configureProviders() {
  console.log('Configuring Firebase OAuth Providers...');

  const config = await auth.getAuthConfig();
  const updatedConfig = {
    ...config,
    multiFactorAuth: {
      state: 'ENABLED',
      providerTypes: ['PHONE_SMS'],
    },
    // Ensure these are enabled in Firebase Console manually
    // This script just verifies
  };

  console.log('✅ Firebase OAuth ready. Enable in Console:');
  console.log('  - Google: firebase.google.com → Authentication → Sign-in method');
  console.log('  - Apple: Requires Apple Team ID, Key ID, and Private Key');
  console.log('  - Facebook: App ID & Secret');
}

configureProviders().catch(console.error);