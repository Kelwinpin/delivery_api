'use strict';

const { createGenericRoutes } = require('../../routes/genericRoutes');

const controller = require('./companies.controller');
const service = require('./companies.service');
const validators = require('./companies.zod');

const entity = {
  entityName: 'company',
  entityNamePlural: 'companies',
  primaryKey: 'id',
  model: 'companies',
  service,
  validators,
  controller,
};

const router = createGenericRoutes(entity);

module.exports = router;