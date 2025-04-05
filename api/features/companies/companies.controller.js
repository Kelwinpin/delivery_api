'use strict';

// const functions = require('../../../commons/utils/functions');
// const {
//   STATUS_CODE,
// } = require('../../../commons/constants/general/http-status-codes');
// const jwt = require('jsonwebtoken');

// const service = require('./cancelation_requests.service');

// exports.list = async (req, _, callback) => {
//   const entidade = req.entidade;
//   try {
//     const token = functions.getToken(req);
//     const decoded = jwt.decode(token);
//     const { body } = req;
//     body.decoded = decoded;
//     body.entidade = entidade;
//     body.idEmpresa = decoded?.idEmpresa ? decoded.idEmpresa : body.idEmpresa;
//     for (const key in req.query) {
//       if (key && !body[key]) body[key] = req.query[key];
//     }
//     body[entidade.primaryKey] = req.params?.id;
//     const detail = body[entidade.primaryKey] | false;
//     const arrayToShow = parseArrayParam(req.query?.show);
//     const productsId = parseArrayParam(req.query?.productsId);
//     const statusId = parseNumericArrayParam(req.query?.statusId);
//     const reasons = parseNumericArrayParam(req.query?.reasons);

//     if (productsId.length > 0) {
//       console.log("entrei");

//       body.productsId = productsId;
//     }
//     if (statusId.length > 0) {
//       body.statusId = statusId;
//     }

//     if (reasons.length > 0) {
//       body.reasons = reasons;
//     }

//     body.arrayToShow = arrayToShow;
//     let orderBy = req.query?.orderBy;
//     if (orderBy) {
//       const positions = orderBy.split('-');
//       body.orderBy = positions[0];
//       body.orderAscDesc = positions[1] ? positions[1] : 'ASC';
//     }

//     console.log(body);

//     const list = await service.get(body, detail);

//     functions.makeCallBack(callback, STATUS_CODE.OK, list);
//   } catch (error) {
//     const errorMessage = `Falha ao listar ${entidade.nomeEntidadePlural}`;
//     functions.makeCallBack(
//       callback,
//       STATUS_CODE.BAD_REQUEST,
//       error,
//       errorMessage,
//     );
//   }
// };