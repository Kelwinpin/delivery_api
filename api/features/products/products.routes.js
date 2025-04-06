'use strict';

const { createGenericRoutes } = require('../../routes/genericRoutes');

const controller = require('./products.controller');
const service = require('./products.service');
const validators = require('./products.zod');

const entity = {
  entityName: 'product',
  entityNamePlural: 'products',
  primaryKey: 'id',
  model: 'products',
  service,
  validators,
  controller,
};

const router = createGenericRoutes(entity);

module.exports = router;