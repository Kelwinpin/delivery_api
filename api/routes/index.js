'use strict';

const express = require('express');
const authorization = require('../../base/auth/middleware');

const router = express.Router();

router.use('/g', require('./generalRoutes'));
router.use('/companies', require('../features/companies/companies.routes'));
router.use('/products', require('../features/products/products.routes'));

module.exports = router;