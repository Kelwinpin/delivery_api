'use strict';

const { createGenericRoutes } = require('../../routes/genericRoutes');

const controller = require('./banners.controller.js');
const service = require('./banners.service');
const validators = require('./banners.zod');

const entity = {
  entityName: 'banner',
  entityNamePlural: 'banners',
  primaryKey: 'id',
  model: 'banners',
  service,
  validators,
  controller,
};

const router = createGenericRoutes(entity);

module.exports = router;