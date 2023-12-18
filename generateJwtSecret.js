const fs = require('fs');
const crypto = require('crypto');

// Function to generate a random JWT secret key
const generateJwtSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString('hex');
  return secretKey;
};

// Generate the JWT secret key
const jwtSecretKey = generateJwtSecretKey();

// Write the secret key to a .env file
fs.writeFileSync('.env', `JWT_SECRET=${jwtSecretKey}`, 'utf-8');

console.log(`JWT secret key generated and saved to .env file.`);
