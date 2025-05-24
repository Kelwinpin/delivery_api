'use strict';

const { createGenericRoutes } = require('../../routes/genericRoutes');

const controller = require('./email.controller');
const service = require('./email.service');
const validators = require('./email.zod');

const entity = {
    entityName: 'email',
    entityNamePlural: 'emails',
    primaryKey: 'id',
    model: 'email',
    service,
    validators,
    controller,
};

const router = createGenericRoutes(entity);

module.exports = router;