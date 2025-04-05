'use strict';

const coreBase = require('../../commons/utils/coreBase');
const functions = require('../../commons/utils/functions');
const {
  STATUS_CODE,
} = require('../../commons/constants/general/http-status-codes');

const cep = require('cep-promise');

exports.list = async (req, _, callback) => {
  try {
    // Recupera o model da URL
    const model = req.params.model;
    if (req.query)
      if (req.query.where) {
        req.query.where.deletedAt = null;
      } else {
        req.query.where = {
          deletedAt: null,
        };
      }

    const result = await coreBase.makeSelect(model, req.query);

    functions.makeCallBack(callback, STATUS_CODE.OK, result);
  } catch (error) {
    const errorMessage = 'Falha ao Listar Dados';
    functions.makeCallBack(
      callback,
      STATUS_CODE.BAD_REQUEST,
      error,
      errorMessage,
    );
  }
};

exports.create = async (req, _, callback) => {
  try {
    // Recupera o model e PK da URL
    const model = req.params.model;

    const result = await coreBase.insert(model, req.body);

    functions.makeCallBack(callback, STATUS_CODE.OK, result);
  } catch (error) {
    const errorMessage = 'Falha ao Inserir Dados';
    functions.makeCallBack(
      callback,
      STATUS_CODE.BAD_REQUEST,
      error,
      errorMessage,
    );
  }
};

exports.update = async (req, _, callback) => {
  try {
    // Recupera o model, PK e Id da URL
    const model = req.params.model;
    const pk = req.params.pk;
    const id = req.params.id;

    coreBase
      .update(model, null, req.body, {
        where: {
          [pk]: id,
        },
      })
      .then((result) => {
        if (!result) {
          throw new Error('Nenhum Dado Encontrado');
        } else {
          // Retorno
          functions.makeCallBack(callback, STATUS_CODE.OK, {
            success: true,
            id: id,
          });
        }
      });
  } catch (error) {
    const errorMessage = 'Falha ao Atualizar Dados';
    functions.makeCallBack(
      callback,
      STATUS_CODE.BAD_REQUEST,
      error,
      errorMessage,
    );
  }
};

exports.delete = async (req, _, callback) => {
  try {
    // Recupera o model, PK e Id da URL
    const model = req.params.model;
    const id = req.params.id;

    const db = await coreBase.getDB();

    await coreBase.update(model, id, {
      deletedAt: new Date(),
    });
    // Retorno
    functions.makeCallBack(callback, STATUS_CODE.OK, {
      success: true,
      id: id,
    });
  } catch (error) {
    const errorMessage = 'Falha ao Deletar';
    functions.makeCallBack(
      callback,
      STATUS_CODE.BAD_REQUEST,
      error,
      errorMessage,
    );
  }
};

exports.findCep = async (req, _, callback) => {
  try {
    const cepFinded = await cep(req.body.cep.toString());
    functions.makeCallBack(callback, STATUS_CODE.OK, cepFinded);
  } catch (error) {
    const errorMessage = 'Falha ao Buscar Cep';
    functions.makeCallBack(
      callback,
      STATUS_CODE.BAD_REQUEST,
      error,
      errorMessage,
    );
  }
};