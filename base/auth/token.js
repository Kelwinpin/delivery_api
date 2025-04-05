const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secretKeys = {
  delivery: process.env.DELIVERY_SECRET_KEY,
};

const selectSecret = (keyToVerify) => {
  const secrets = Object.keys(secretKeys).reduce((acc, key) => {
    acc[key] = String(process.env[secretKeys[key]]);
    return acc;
  }, {});
  return secrets[keyToVerify];
};

exports.createToken = (obj, secret) => {
  const token = jwt.sign(obj, selectSecret(secret));
  return token;
};

exports.decodeToken = (token, secret) => {
  try {
    const payload = jwt.verify(token, selectSecret(secret));
    return payload;
  } catch (e) {
    throw e;
  }
};