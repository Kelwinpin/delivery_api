'use strict';

const express = require('express');
const controllers = require('../controllers');
const generalController = require('../controllers/generalController');

const router = express.Router();

router.get('/:model/list', async (req, res) => {
  controllers.execute(req, res, await generalController.list);
});

router.get('/:model/list/:pk/:id', async (req, res) => {
  req.query.where = {
    [req.params.pk]: parseInt(req.params.id),
  };
  controllers.execute(req, res, await generalController.list);
});

router.post('/:model/create/:pk', async (req, res) => {
  controllers.execute(req, res, await generalController.create);
});

router.put('/:model/update/:pk/:id', async (req, res) => {
  controllers.execute(req, res, await generalController.update);
});

router.delete('/:model/delete/:pk/:id', async (req, res) => {
  controllers.execute(req, res, await generalController.delete);
});

router.post('/find-cep', async (req, res) => {
  controllers.execute(req, res, await generalController.findCep);
});

module.exports = router;