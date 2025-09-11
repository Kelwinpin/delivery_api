'use strict';

const express = require('express');
const authorization = require('../../base/auth/middleware');
const uploadMiddleware = require('../../api/middleware/uploadMiddleware').uploadMiddleware;

const router = express.Router();

router.use('/g', require('./generalRoutes'));
router.use('/upload', require('./uploadRoutes'));
router.use('/login', require('../features/login/login.routes'));
router.use('/companies', require('../features/companies/companies.routes'));
router.use('/products', require('../features/products/products.routes'));
router.use('/users', require('../features/users/users.routes'));
router.use('/orders', require('../features/orders/orders.routes'));
router.use('/orderItens', require('../features/orderItens/orderItens.routes'));
router.use('/deliverymans', require('../features/deliverymans/deliverymans.routes'));
router.use('/sendEmail', require('../features/email/email.routes'));
router.use('/banners', require('../features/banners/banners.routes'));

module.exports = router;