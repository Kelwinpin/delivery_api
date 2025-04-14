'use strict';

const { createGenericRoutes } = require('../../routes/genericRoutes');

const controller = require('./dashboard.controller');
const service = require('./dashboard.service');
const validators = require('./dashboard.zod');

const entity = {
  entityName: 'dashboard',
  entityNamePlural: 'dashboards',
  primaryKey: 'id',
  model: 'dashboard',
  service,
  validators,
  controller,
};

const router = createGenericRoutes(entity);

module.exports = router;