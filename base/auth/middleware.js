const functions = require("./../utils/functions.js");
const jwt = require("jsonwebtoken");
const tokenService = require("./token.js");
const dotenv = require("dotenv");

dotenv.config();

const secretKeys = {
  delivery: process.env.DELIVERY_SECRET_KEY,
};

exports.validateToken = (req, res, next) => {
  var token = functions.getToken(req);

  if (!token) {
    res.status(401).send({
      errorMessage: "Token Inexistente",
      error: 401,
    });
    return;
  }

  const decoded = jwt.decode(token);
  if (!decoded) {
    res.status(401).send({
      errorMessage: "Token Mal Formatado",
      error: 401,
    });
    return;
  }

  try {
    const api = req.locals.api;
    const decoded = tokenService.decodeToken(token, secretKeys[api]);
    req.locals.user = decoded;
  } catch (error) {
    res.status(401).send({
      errorMessage: "Assinatura de Token Inválida",
      error: 401,
    });
    return;
  }
  next();
};