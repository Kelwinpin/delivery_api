/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const configs = require("./../constants/db/index.js");
const versao = process.env.MODEL_VERSION || 1;
const tableHints = Sequelize.TableHints;
const coreMemory = require("./coreMemory.js");

// https://stackoverflow.com/a/49678951
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);

  // Z here means current timezone, _not_ UTC
  // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
  return date.format("YYYY-MM-DD HH:mm:ss.SSS");
};

/**
 * connectionBase: Realiza e Retorna a conexão na base do cliente
 * @return {Promise}
 */
const connectionBase = async () => {
  try {
    // Realiza conexão de acodo com os dados do cliente

    const config = configs;
    
    const sequelize = new Sequelize(config.database, config.username, config.password, config);

    console.log("AMBIENTE=>", config.host, config.database);
    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    // Importa todos os metadados dos models
    importAllModels(db);

    await db.sequelize.authenticate();
    return db;
  } catch (e) {
    console.log(e);
    coreMemory.setConnection(null);
    return e;
  }
};

const getDB = async () => {
  let db = coreMemory.getConnection();
  return db;
};

/**
 * importAllModels: Percorre a pasta da versão atual (enviroment variable) dos models e carrega os metadados no db.
 * @param {Object} db Metadados do sequelize
 */
const importAllModels = (db) => {
  const modelsPath = `${__dirname}/../database/models/`;

  // Percorre o diretório de models
  fs.readdirSync(modelsPath)
    .filter((file) => file.indexOf(".") !== 0 && file.slice(-3) === ".js")
    .forEach((file) => {
      const model = db.sequelize.import(path.join(modelsPath, file));
      db[model.name] = model;
    });

  // Associa todos os models relacionais
  Object.keys(db).forEach((modelName) => {
    if ("associate" in db[modelName]) {
      db[modelName].associate(db);
    }
  });
  console.log("import all models", modelsPath);
};

/**
 * getTransaction: Retorna um objeto com a transação do sequelize
 */
const getTransaction = async () => {
  const db = await getDB();
  return db.sequelize.transaction();
};

/**
 * getOperators: Retorna o operador do sequelize
 */
const getOperators = async () => {
  const db = await getDB();
  return db.Sequelize.Op;
};

const getModelAssociations = async (model) => {
  const db = await getDB();
  const associations = db[model].associations;
  const arrayAssociations = [];
  for (const key in associations) {
    arrayAssociations.push(key);
  }

  return arrayAssociations?.length > 0 ? arrayAssociations : null;
};

/**
 * makeSelect: Retorna um objeto com os dados do banco
 * @param {Object} model Model do sequelize
 * @param {Object} params Parâmetros utilizados na query no model
 */
const makeSelect = async (model, params = {}) => {
  try {
    const db = await getDB();
    params.tableHint = tableHints.NOLOCK;

    const result = await db[model].findAll(params);
    return result;
  } catch (e) {
    throw e;
  }
};

/**
 * makeSelectByPK: Retorna um objeto com os dados do banco
 * @param {Object} model Model do sequelize
 * @param {Object} id Id do objeto a ser retornado
 * @param {Object} params Parâmetros utilizados na query no model
 */
const makeSelectByPK = async (model, id, params = {}) => {
  try {
    const db = await getDB();

    params.tableHint = tableHints.NOLOCK;

    const result = await db[model].findByPk(id, params);

    return result;
  } catch (e) {
    throw e;
  }
};

/**
 * makeSelectPaging: Retorna um objeto com os dados do banco e paginação
 * @param {Object} model Model do sequelize
 * @param {Object} params Parâmetros utilizados na query no model
 * @param {Number} offset Posição do início da paginação
 * @param {Number} limit Quantidade de registros a serem retornados
 */
const makeSelectPaging = async (model, params = {}, offset = 0, limit = 10, order, orderBy) => {
  try {
    const db = await getDB();

    params.tableHint = tableHints.NOLOCK;
    params.offset = params?.offset ? params.offset : offset;
    params.limit = params?.limit ? params.limit : limit;

    if (orderBy) {
      if (typeof orderBy === "string") {
        params.order = [[orderBy, order || "desc"]]; // Padrão para 'desc' se `order` não for fornecido
      } else {
        params.order = orderBy;
      }
    }

    const result = await db[model].findAndCountAll(params);

    const pages = Math.ceil(result.count / params.limit);
    result.pages = pages;
    return result;
  } catch (e) {
    throw e;
  }
};

/**
 * makeCount: Retorna apenas a contagem de registros de um model
 * @param {Object} model Model do sequelize
 * @param {Object} params Parâmetros utilizados na query no model
 */
const makeCount = async (model, params = {}) => {
  try {
    const db = await getDB();

    // Adicionando a dica de tabela (tableHint) se necessário
    params.tableHint = tableHints.NOLOCK;

    // Realizando apenas a contagem com findAndCountAll
    const result = await db[model].count(params);

    return { count: result };
  } catch (e) {
    throw e;
  }
};

const makeCountGroup = async (model, params = {}) => {
  try {
    const db = await getDB();

    // Adicionando a dica de tabela (tableHint) se necessário
    params.tableHint = tableHints.NOLOCK;

    // Verificando se há um grupo definido
    const group = params.group;

    // Realizando a contagem com ou sem GROUP BY
    const result = group
      ? await db[model].count({
        where: params.where,
        include: params.include,
        group: group,
        raw: true,
      })
      : await db[model].count(params);

    return { count: result.length }; // Retorna o número de grupos ou a contagem direta
  } catch (e) {
    throw e;
  }
};

/**
 * insert: Insere objeto do banco
 * @param {Object} model Model do sequelize
 * @param {Object} values Valores a serem inseridos
 * @param {Object} params Parâmetros utilizados na query no model
 */
const insert = async (model, values, params = {}) => {

  const db = await getDB();
  const hasTransaction = params?.transaction ? true : false;
  const transaction = params?.transaction ? params.transaction : await db.sequelize.transaction();
  if (!hasTransaction) params.transaction = transaction;

  try {
    const result = await db[model].create(values, params);
    if (!hasTransaction) await transaction.commit();
    return result;
  } catch (e) {
    console.log(e);
    if (transaction) await transaction.rollback();
    throw e;
  }
};

/**
 * bulkInsert: Insere objetos do banco
 * @param {Object} model Model do sequelize
 * @param {Object} values Valores a serem inseridos
 * @param {Object} params Parâmetros utilizados na query no model
 */
const bulkInsert = async (model, values, params = {}) => {
  const db = await getDB();
  const hasTransaction = params?.transaction ? true : false;
  const transaction = params?.transaction ? params.transaction : await db.sequelize.transaction();
  if (!hasTransaction) params.transaction = transaction;
  try {
    const result = await db[model].bulkCreate(values, params);

    if (!hasTransaction) await transaction.commit();
    return result;
  } catch (e) {
    if (transaction) await transaction.rollback();
    throw e;
  }
};

/**
 * upsert: Atualiza ou insere objeto do banco
 * @param {Object} model Model do sequelize
 * @param {Object} newValues Valores a serem inseridos
 * @param {Object} params Parâmetros utilizados na query no model
 */
const upsert = async (model, newValues, params) => {
  const db = await getDB();
  const hasTransaction = params?.transaction ? true : false;
  const transaction = params?.transaction ? params.transaction : await db.sequelize.transaction();
  if (!hasTransaction) params.transaction = transaction;
  try {
    const db = await getDB();

    const result = await db[model].findAll(params);
    console.log(result);
    if (result.length > 0) {
      const updatedRecords = [];
      for (const record of result) {
        const updatedRecord = await record.update(newValues, { transaction });
        updatedRecords.push(updatedRecord);
      }
      if (!hasTransaction) await transaction.commit();
      return updatedRecords;
    } else {
      const created = await db[model].create(newValues, { transaction });
      if (!hasTransaction) await transaction.commit();
      return [created];
    }
  } catch (e) {
    if (transaction) await transaction.rollback();
    throw e;
  }
};

/**
 * update: Atualiza objeto do banco
 * @param {Object} model Model do sequelize
 * @param {Object} id Id do objeto a ser atualizado
 * @param {Object} values Valores a serem atualizados
 * @param {Object} params Parâmetros utilizados na query no model
 */
const update = async (model, id, values, params = {}) => {

  const db = await getDB();

  const hasTransaction = params?.transaction ? true : false;
  const transaction = params?.transaction ? params.transaction : await db.sequelize.transaction();
  if (!hasTransaction) params.transaction = transaction;
  try {
    if (id) {
      const pk = db[model].primaryKeyAttributes[0];
      params.where = {
        [pk]: id,
      };
    }

    const result = await db[model].findAll(params);
    if (result.length == 0) {
      throw new Error("Nenhum Registro Atualizado");
    }
    const updatedRecords = [];
    for (const record of result) {
      const updatedRecord = await record.update(values, { transaction });
      updatedRecords.push(updatedRecord);
    }
    if (!hasTransaction) await transaction.commit();
    return updatedRecords.length === 1 ? updatedRecords[0] : updatedRecords;
  } catch (e) {
    if (transaction) await transaction.rollback();
    throw e;
  }
};

const upsertLog = async (model, newValues, params, user) => {
  try {
    const db = await getDB();
    const pk = db[model].primaryKeyAttributes[0];

    db[model].findAll(params).then(async (result) => {
      if (result.length > 0) {
        if (result.length == 1) {
          const dadosOld = { ...result[0].dataValues };
          const resultUp = await result[0].update(newValues);

          const logs = await insereLog(model, resultUp._changed, resultUp[pk], dadosOld, newValues, user);
          resultUp.logs = logs;

          return resultUp;
        } else {
          const arrayPromess = [];
          const atualiza = async (item, newValues, dadosOld) => {
            const resultUp = await item.update(newValues);
            const logs = await insereLog(model, resultUp._changed, resultUp[pk], dadosOld, newValues, user);
            resultUp.logs = logs;
            return resultUp;
          };
          result.forEach((item) => {
            const dadosOld = { ...item.dataValues };
            arrayPromess.push(atualiza(item, newValues, dadosOld));
          });
          const res = await Promise.all(arrayPromess);
          return res;
        }
      } else {
        const created = await db[model].create(newValues);
        created.logs = 1;
        return created;
      }
    });
  } catch (e) {
    throw e;
  }
};

/**
 * deleteWhere: Apaga objeto do banco
 * @param {Object} model Model do sequelize
 * @param {Object} id Id do objeto a ser apagado
 * @param {Object} params Parâmetros utilizados na query no model
 * @param {Boolean} virtual Se o objeto deve ser apagado ou não
 */
const deleteOrign = async (model, id, params = {}, virtual = true) => {
  const db = await getDB();
  const hasTransaction = params?.transaction ? true : false;
  const transaction = params?.transaction ? params.transaction : await db.sequelize.transaction();
  if (!hasTransaction) params.transaction = transaction;
  try {
    const result = await db[model].findByPk(id, params);
    if (result) {
      if (virtual) await result.update({ deletedAt: new Date() }, { transaction });
      else await result.destroy({ transaction });
    }
    if (!hasTransaction) await transaction.commit();
    return true;
  } catch (e) {
    if (transaction) await transaction.rollback();
    throw e;
  }
};

/**
 * deleteWhere: Apaga objeto do banco
 * @param {Object} model Model do sequelize
 * @param {Object} params Parâmetros utilizados na query no model
 * @param {Boolean} virtual Se o objeto deve ser apagado ou não
 */
const deleteWhere = async (model, params = {}, virtual = true) => {
  const db = await getDB();
  const hasTransaction = params?.transaction ? true : false;
  const transaction = params?.transaction ? params.transaction : await db.sequelize.transaction();
  if (!hasTransaction) params.transaction = transaction;
  try {
    let result;
    if (virtual) result = await db[model].update({ deletedAt: new Date() }, params);
    else result = await db[model].destroy(params);
    if (!hasTransaction) await transaction.commit();
    return result;
  } catch (e) {
    if (transaction) await transaction.rollback();
    throw e;
  }
};

/**
 * findOrCreate: Retorna um objeto com os dados do banco ou cria um novo objeto se não existir
 * @param {Object} model Model do sequelize
 * @param {Object} params Parâmetros utilizados na query no model
 */
const findOrCreate = async (model, params = {}) => {
  const db = await getDB();
  const hasTransaction = params?.transaction ? true : false;
  const transaction = params?.transaction ? params.transaction : await db.sequelize.transaction();
  if (!hasTransaction) params.transaction = transaction;
  try {
    return db[model].findOrCreate(params).spread((result, created) => {
      return {
        result: result,
        created: created,
      };
    });
  } catch (e) {
    if (transaction) await transaction.rollback();
    throw e;
  }
};

/**
 * rawQuery: Executa uma query no banco
 * @param {String} query Query a ser executada
 * @param {Object} params Parâmetros utilizados na query
 */
const rawQuery = async (query, params = {}) => {
  try {
    const db = await getDB();

    const result = await db.sequelize.query(query, params);
    return result[0];
  } catch (e) {
    throw e;
  }
};

/**
 * commitTransaction: Commita uma transação
 * @param {Object} transaction Transação a ser commitada
 */
const commitTransaction = async (transaction) => {
  try {
    if (transaction) await transaction.commit();
    return;
  } catch (e) {
    if (transaction) await transaction.rollback();
    throw e;
  }
};

/**
 * beginTransaction: Inicia e retorna um objeto de transação do Sequelize.
 * Permite que você utilize a transação em operações subsequentes.
 * @param {String} typeDB Tipo de banco, padrão "NEW". Pode ser "OLD" se necessário.
 * @return {Promise} Objeto de transação
 */
const beginTransaction = async (typeDB = "NEW") => {
  const db = await getDB(typeDB);
  return db.sequelize.transaction();
};

const converteJsonEmObjRetornaDiferenca = (dadoOld, dadoNew, prefix) => {
  const objDadoNew = typeof dadoNew == "string" && dadoNew.startsWith(`{"`) ? JSON.parse(dadoNew) : dadoNew;
  const objDadoOld = typeof dadoOld == "string" && dadoOld.startsWith(`{"`) ? JSON.parse(dadoOld) : dadoOld;
  const diferencas = [];

  for (const key in objDadoOld) {
    if (objDadoOld[key] || objDadoNew[key]) {
      const campo = prefix ? `${prefix}.${key}` : key;
      if (typeof objDadoOld[key] == "object" && typeof objDadoNew[key] == "object") {
        const subDiferencas = converteJsonEmObjRetornaDiferenca(objDadoOld[key], objDadoNew[key], key);
        diferencas.push(...subDiferencas);
      } else if (objDadoOld[key] != objDadoNew[key]) {
        diferencas.push({
          campo,
          dadoOld: objDadoOld[key],
          dadoNew: objDadoNew[key],
        });
      }
    }
  }
  return diferencas;
};

module.exports = {
  connectionBase,
  getDB,
  getTransaction,
  getOperators,
  makeSelect,
  makeSelectByPK,
  makeSelectPaging,
  makeCount,
  makeCountGroup,
  insert,
  bulkInsert,
  upsert,
  update,
  upsertLog,
  deleteOrign,
  deleteWhere,
  findOrCreate,
  rawQuery,
  commitTransaction,
  getModelAssociations,
  beginTransaction,
};