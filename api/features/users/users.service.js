/* eslint-disable valid-jsdoc */
'use strict';

const coreBase = require('../../../base/utils/coreBase');
const { sendEmail } = require('../../../base/utils/emailSender');
const functions = require('../../../base/utils/functions');
const { welcome } = require('../../../base/constants/hmtl/welcome');

const get = async (dataToFind, detail) => {
  try {
    const Op = await coreBase.getOperators();
    const atributosFromAssociation = {};

    const paramsQuery = {
      attributes: { exclude: null },
      where: {},
    };

    if (dataToFind.showPass) {
      paramsQuery.attributes.exclude = null;
    }

    paramsQuery.include = [];
    if (dataToFind.arrayToShow) {
      const modelAssociations = await coreBase.getModelAssociations(
        dataToFind.entity.model,
      );

      const associations = await functions.returnAssociation(
        modelAssociations,
        dataToFind.arrayToShow,
        atributosFromAssociation,
      );
      paramsQuery.include = associations;
    }

    if (dataToFind.idStatus) {
      paramsQuery.where.idStatus = dataToFind.idStatus;
    }

    if (dataToFind.status == 'active') paramsQuery.where.deletedAt = null;
    if (dataToFind.status == 'inactive')
      paramsQuery.where.deletedAt = {
        [Op.ne]: null,
      };
    if (dataToFind.status == 'all') paramsQuery.where = {};

    if (dataToFind.companyId) {
      paramsQuery.where.companyId = dataToFind.companyId;
    }

    if (dataToFind.cpf) {
      paramsQuery.where.cpf = {
        [Op.like]: '%' + dataToFind.cpf + '%',
      };
    }

    const limit = dataToFind.itensPerPage
      ? Number(dataToFind.itensPerPage)
      : 10;

    let page = dataToFind.page ? Number(dataToFind.page) : 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * limit;

    const orderBy = dataToFind.orderBy
      ? dataToFind.orderBy
      : dataToFind.entity.primaryKey;
    const orderAscDesc = dataToFind.orderAscDesc
      ? dataToFind.orderAscDesc
      : 'DESC';

    const list = await coreBase.makeSelectPaging(
      dataToFind.entity.model,
      paramsQuery,
      offset,
      limit,
      orderAscDesc,
      orderBy,
    );

    if (detail)
      if (list.rows.length > 0) return list.rows[0];
      else
        throw new Error(`${dataToFind.entity.nomeentity} Não Encontrado`);

    return list;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const create = async (incomingData) => {
  try {
    incomingData.password = await functions.generateEncryptedPassword(incomingData.password);
    
    const newUser = await coreBase.insert(
      incomingData.entity.model,
      incomingData,
      {},
      incomingData.decoded?.id,
    );

    await coreBase.insert("emailValidation", {
      code: Math.floor(100000 + Math.random() * 900000).toString(),
      user_id: newUser.id,
      email: incomingData.email,
    });

    sendEmail(incomingData.email, 'Cadastro no sistema de entrega', 'Bem vindo!', welcome);

    return newUser;
  } catch (error) {
    throw error;
  }
};

const update = async (incomingData) => {
  try {
    if (incomingData.active == false) incomingData.deletedAt = new Date();

    incomingData.updatedAt = new Date();

    const updated = await coreBase.update(
      incomingData.entity.model,
      [incomingData.id],
      incomingData,
      {},
      incomingData.decoded?.idUsuario,
    );

    return updated;
  } catch (error) {
    throw error;
  }
};

const changeStatus = async (ids, type, decoded, entity) => {
  try {
    const dataToChange = {};
    dataToChange.deletedAt = null;

    if (type === 'inactive') {
      dataToChange.deletedAt = new Date();
    }

    dataToChange.updatedAt = new Date();

    const updated = await coreBase.update(
      entity.model,
      ids,
      dataToChange,
      {},
      decoded?.idUsuario,
    );

    return updated;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  update,
  create,
  changeStatus,
  get,
};