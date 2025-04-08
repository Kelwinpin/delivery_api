'use strict';

const { createGenericRoutes } = require('../../routes/genericRoutes');

const controller = require('./deliverymans.controller');
const service = require('./deliverymans.service');
const validators = require('./deliverymans.zod');

const entity = {
    entityName: 'deliveryman',
    entityNamePlural: 'deliverymans',
    primaryKey: 'id',
    model: 'deliverymans',
    service,
    validators,
    controller,
};

const router = createGenericRoutes(entity);

module.exports = router;