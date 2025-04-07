'use strict';

const { createGenericRoutes } = require('../../routes/genericRoutes');

const controller = require('./orderItens.controller');
const service = require('./orderItens.service');
const validators = require('./orderItens.zod');

const entity = {
    entityName: 'orderItem',
    entityNamePlural: 'orderItens',
    primaryKey: 'id',
    model: 'orderItens',
    service,
    validators,
    controller,
};

const router = createGenericRoutes(entity);

module.exports = router;