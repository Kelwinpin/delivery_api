'use strict';

const express = require('express');
const { validateBody } = require('../../../base/utils/functions.js');
const controllers = require('../../controllers');

const controller = require('./login.controller');
const { login } = require('./login.zod');

const router = express.Router();

router.post('/', validateBody(login), async (req, res) => {
    controllers.execute(req, res, await controller.makeLogin);
});

module.exports = router;