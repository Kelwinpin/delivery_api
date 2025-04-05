'use strict';

const functions = require('../../base/utils/functions.js');
const {
  STATUS_CODE,
} = require('../../base/constants/general/http-status-codes.js');
const jwt = require('jsonwebtoken');

function parseArrayParam(param) {
  if (!param) return [];
  return param
    .replace(/[\[\]]/g, '')
    .split(',')
    .filter((item) => item !== '');
}

function parseNumericArrayParam(param) {
  const array = parseArrayParam(param);
  return array.map(Number).filter((num) => !isNaN(num));
}

exports.list = async (req, _, callback) => {
  const entity = req.entity;
  console.log("🚀 ~ exports.list= ~ entity:", entity)
  try {
    const token = functions.getToken(req);
    const decoded = jwt.decode(token);
    const { body } = req;
    body.decoded = decoded;
    body.entity = entity;
    body.companyId = decoded?.companyId ? decoded.companyId : body.companyId;
    for (const key in req.query) {
      if (key && !body[key]) body[key] = req.query[key];
    }
    body[entity.primaryKey] = req.params?.id;
    const detail = body[entity.primaryKey] | false;
    const arrayToShow = parseArrayParam(req.query?.show);
    const productsId = parseArrayParam(req.query?.productsId);
    const statusId = parseNumericArrayParam(req.query?.statusId);
    const reasons = parseNumericArrayParam(req.query?.reasons);

    if (productsId.length > 0) {
      body.productsId = productsId;
    }
    if (statusId.length > 0) {
      body.statusId = statusId;
    }

    if (reasons.length > 0) {
      body.reasons = reasons;
    }

    body.arrayToShow = arrayToShow;
    let orderBy = req.query?.orderBy;
    if (orderBy) {
      const positions = orderBy.split('-');
      body.orderBy = positions[0];
      body.orderAscDesc = positions[1] ? positions[1] : 'ASC';
    }
    const list = await entity.service.get(body, detail);

    functions.makeCallBack(callback, STATUS_CODE.OK, list);
  } catch (error) {
    const errorMessage = `Falha ao listar ${entity.entityNamePlural}`;
    functions.makeCallBack(
      callback,
      STATUS_CODE.BAD_REQUEST,
      error,
      errorMessage,
    );
  }
};

exports.find = async (req, _, callback) => {
  const entity = req.entity;
  try {
    const token = functions.getToken(req);
    const decoded = jwt.decode(token);
    const { body } = req;
    body.decoded = decoded;
    body.entity = entity;
    body.companyId = decoded?.companyId ? decoded.companyId : body.companyId;
    for (const key in req.query) {
      if (key && !body[key]) body[key] = req.query[key];
    }
    body[entity.primaryKey] = req.params?.id;
    const detail = body[entity.primaryKey] | false;
    let show = req.query?.show;
    let arrayToShow = [];
    if (show) {
      show = show.replace(/[\[\]]/g, '');
      arrayToShow = show?.split(',');
    }
    body.arrayToShow = arrayToShow;
    let orderBy = req.query?.orderBy;
    if (orderBy) {
      const positions = orderBy.split('-');
      body.orderBy = positions[0];
      body.orderAscDesc = positions[1] ? positions[1] : 'ASC';
    }
    const list = await entity.service.get(body, false);

    functions.makeCallBack(callback, STATUS_CODE.OK, list);
  } catch (error) {
    const errorMessage = `Falha ao buscar ${entity.entityName}`;
    functions.makeCallBack(
      callback,
      STATUS_CODE.BAD_REQUEST,
      error,
      errorMessage,
    );
  }
};

exports.update = async (req, _, callback) => {
  const entity = req.entity;
  try {
    const token = functions.getToken(req);
    const decoded = jwt.decode(token);
    const { body } = req;
    body.decoded = decoded;
    body.entity = entity;
    body.companyId = decoded?.companyId ? decoded.companyId : body.companyId;
    body.id = req.params?.id;

    const updated = await entity.service.update(body);

    functions.makeCallBack(callback, STATUS_CODE.OK, updated);
  } catch (error) {
    const errorMessage = `Falha ao atualizar ${entity.entityName}`;
    functions.makeCallBack(
      callback,
      STATUS_CODE.BAD_REQUEST,
      error,
      errorMessage,
    );
  }
};

exports.create = async (req, _, callback) => {
  const entity = req.entity;
  try {
    const token = functions.getToken(req);
    const decoded = jwt.decode(token);
    const { body } = req;
    body.decoded = decoded;
    body.entity = entity;
    body.companyId = decoded?.companyId ? decoded.companyId : body.companyId;
    const updated = await entity.service.create(body);

    functions.makeCallBack(callback, STATUS_CODE.OK, updated);
  } catch (error) {
    const errorMessage = `Falha ao adicionar ${entity.entityName}`;
    functions.makeCallBack(
      callback,
      STATUS_CODE.BAD_REQUEST,
      error,
      errorMessage,
    );
  }
};

exports.inactive = async (req, _, callback) => {
  const entity = req.entity;
  try {
    const token = functions.getToken(req);
    const decoded = jwt.decode(token);
    let { ids } = req.body;
    const id = req.params.id;
    ids = ids || id;

    const updated = await entity.service.changeStatus(
      ids,
      'inactive',
      decoded,
      entity,
    );

    functions.makeCallBack(callback, STATUS_CODE.OK, updated);
  } catch (error) {
    const errorMessage = `Falha ao inativar ${entity.entityName}(s)`;
    functions.makeCallBack(
      callback,
      STATUS_CODE.BAD_REQUEST,
      error,
      errorMessage,
    );
  }
};

exports.reactive = async (req, _, callback) => {
  const entity = req.entity;
  try {
    const token = functions.getToken(req);
    const decoded = jwt.decode(token);
    let { ids } = req.body;
    const id = req.params.id;
    ids = ids || id;
    console.log(198, decoded, entity, ids);

    const updated = await entity.service.changeStatus(
      ids,
      'reactive',
      decoded,
      entity,
    );

    functions.makeCallBack(callback, STATUS_CODE.OK, updated);
  } catch (error) {
    const errorMessage = `Falha ao reativar ${entity.entityName}(s)`;
    functions.makeCallBack(
      callback,
      STATUS_CODE.BAD_REQUEST,
      error,
      errorMessage,
    );
  }
};