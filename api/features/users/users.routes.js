'use strict';

const { createGenericRoutes } = require('../../routes/genericRoutes');

const controller = require('./users.controller');
const service = require('./users.service');
const validators = require('./users.zod');

const entity = {
  entityName: 'user',
  entityNamePlural: 'users',
  primaryKey: 'id',
  model: 'users',
  service,
  validators,
  controller,
};

const router = createGenericRoutes(entity);

module.exports = router;