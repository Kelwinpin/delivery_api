
"use strict";

module.exports = {
  memoryDB: null,
  clientIo: null,
  objInitial: null,
  objConfig: null,

  /**
   * getObjInitial: Pega a variavel de Valores iniciais na Memoria
   */
  getObjInitial: function () {
    return this.objInitial;
  },

  /**
   * setObjInitial: Seta a variavel de Valores iniciais na Memoria
   */
  setObjInitial: function (val) {
    this.objInitial = val;
  },
  /**
   * setObjConfig: Seta a variavel de Valores iniciais na Memoria
   */
  setObjConfig: function (val) {
    this.objConfig = val;
  },
  /**
   * getObjConfig: Pega a variavel de Valores de Configuracao na Memoria
   */
  getObjConfig: function () {
    return this.objConfig;
  },

  /**
   * setConnection: Controla a Conexao com o Banco
   */
  setConnection: function (val) {
    this.memoryDB = val;
  },

  /**
   * getConnection: Busca a Conexao com o Banco
   */
  getConnection: function () {
    try {
      return this.memoryDB;
    } catch (e) {
      return null;
    }
  },

  setClientIo: function (val) {
    clientIo = val;
  },

  getClientIo: function (val) {
    return clientIo;
  },

  setServerIo: function (val) {
    ServerIo = val;
  },

  getServerIo: function (val) {
    return ServerIo;
  },
};
