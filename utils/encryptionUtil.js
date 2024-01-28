// // utils/encryptionUtil.js
const crypto = require('crypto');

const generateRandomKey = () => {
  return crypto.randomBytes(32).toString('hex'); 
};

const ENCRYPTION_KEY = generateRandomKey();
const ALGORITHM = 'aes-256-cbc';

const encryptData = (data) => {
  try {
    const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encryptedData = cipher.update(data, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return `${iv.toString('hex')}:${encryptedData}`;
  } catch (error) {
    console.error('Error encrypting data:', error);
    throw error;
  }
};

module.exports = { encryptData };
