const express = require('express');
const controllers = require('../controllers');
const genericController = require('../controllers/genericController');
const { validateBody } = require('../../base/utils/functions.js');

const createGenericRoutes = (entity) => {
  console.log("🚀 ~ createGenericRoutes ~ entity:", entity)
  const router = express.Router();

  if (entity) {
    const validator = entity.validators;
    const insert = validator.insert;
    const ids = validator.ids;

    // Middleware para setar a entidade
    const setEntity = (req, res, next) => {
      req.entity = entity;
      next();
    };

    // Rotas genéricas
    router.get('/', setEntity, async (req, res) => {
      controllers.execute(req, res, await genericController.list);
    });

    router.get('/:status', setEntity, async (req, res) => {
      controllers.execute(req, res, await genericController.list);
    });

    router.post('/search', setEntity, async (req, res) => {
      controllers.execute(req, res, await genericController.list);
    });

    router.get('/detail/:id', setEntity, async (req, res) => {
      controllers.execute(req, res, await genericController.list);
    });

    router.put('/:id', setEntity, async (req, res) => {
      controllers.execute(req, res, await genericController.update);
    });
    router.patch('/:id', setEntity, async (req, res) => {
      controllers.execute(req, res, await genericController.update);
    });

    router.post('/', setEntity, validateBody(insert), async (req, res) => {
      controllers.execute(req, res, await genericController.create);
    });

    router.post(
      '/inactive/',
      setEntity,
      validateBody(ids),
      async (req, res) => {
        controllers.execute(req, res, await genericController.inactive);
      },
    );
    router.delete('/:id', setEntity, async (req, res) => {
      controllers.execute(req, res, await genericController.inactive);
    });

    router.post(
      '/reactive',
      setEntity,
      validateBody(ids),
      async (req, res) => {
        controllers.execute(req, res, await genericController.reactive);
      },
    );
    router.put('/reactive/:id', setEntity, async (req, res) => {
      controllers.execute(req, res, await genericController.reactive);
    });
  }

  return router;
};

module.exports = { createGenericRoutes };