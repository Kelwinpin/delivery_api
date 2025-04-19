'use strict';

const express = require('express');
const { validateBody } = require('../../../base/utils/functions.js');
const controllers = require('../../controllers');

const controller = require('./login.controller');
const { loginSchema } = require('./login.zod');

const router = express.Router();

router.post('/', validateBody(loginSchema), async (req, res) => {
    controllers.execute(req, res, await controller.makeLogin);
});

router.post('/dashboard', validateBody(loginSchema), async (req, res) => {
    controllers.execute(req, res, await controller.makeLoginDashboard);
});

module.exports = router;