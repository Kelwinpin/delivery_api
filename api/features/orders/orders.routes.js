'use strict';

const { createGenericRoutes } = require('../../routes/genericRoutes');

const controller = require('./orders.controller');
const service = require('./orders.service');
const validators = require('./orders.zod');

const entity = {
  entityName: 'order',
  entityNamePlural: 'orders',
  primaryKey: 'id',
  model: 'orders',
  service,
  validators,
  controller,
};

const router = createGenericRoutes(entity);

module.exports = router;