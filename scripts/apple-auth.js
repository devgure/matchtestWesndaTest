// scripts/apple-auth.js
const jwt = require('jsonwebtoken');

const generateAppleClientSecret = () => {
  const teamId = 'YOUR_TEAM_ID';
  const clientId = 'com.matchai.auth'; // Bundle ID / Services ID
  const keyId = 'YOUR_KEY_ID';
  const privateKey = `-----BEGIN PRIVATE KEY-----
YOUR PRIVATE KEY FROM APPLE DEVELOPER
-----END PRIVATE KEY-----`;

  const payload = {
    iss: teamId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400 * 180, // 6 months
    aud: 'https://appleid.apple.com',
    sub: clientId,
  };

  return jwt.sign(payload, privateKey, {
    algorithm: 'ES256',
    keyid: keyId,
  });
};

module.exports = { generateAppleClientSecret };