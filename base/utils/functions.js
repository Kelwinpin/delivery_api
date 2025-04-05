var axios = require("axios");
const moment = require("moment");
const rp = require("request-promise");
const { ErrorRequestBuilder } = require("./erro-request.builder");
const { STATUS_CODE } = require("./../constants/general/http-status-codes");
const { ValidationError } = require("./validation-error");
const coreBase = require("./coreBase");
const tokenService = require("./../auth/token");
const crypto = require("crypto");
const bcryptjs = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

exports.sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

exports.getHeader = (token) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

exports.makeGet = (endpoint, token) => {
  return new Promise((resolve, reject) => {
    try {
      axios.defaults.timeout = 20000;
      axios
        .get(endpoint, {
          headers: this.getHeader(token),
        })
        .then(async (result) => {
          resolve(result.data);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};

exports.makeGetBuffer = (endpoint, token) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(endpoint, {
          responseType: "blob",
        })
        .then(async (result) => {
          resolve(result.data);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};

exports.makePost = (endpoint, token, data) => {
  return new Promise((resolve, reject) => {
    try {
      //axios.defaults.timeout = 3000;
      axios
        .post(endpoint, data, {
          headers: this.getHeader(token),
        })
        .then(async (result) => {
          resolve(result.data);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};

exports.inArray = (target, array) => {
  /* Caching array.length doesn't increase the performance of the for loop on V8 (and probably on most of other major engines) */

  for (var i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return true;
    }
  }

  return false;
};

exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

exports.replaceAll = (string, search, replace) => {
  return string.split(search).join(replace);
};

exports.FormataStringData2 = (data) => {
  var dia = data.split("/")[0];
  var mes = data.split("/")[1];
  var ano = data.split("/")[2];

  return [ano, mes, dia];
};

exports.FormataStringData = (data) => {
  var dia = data.split("/")[0];
  var mes = data.split("/")[1];
  var ano = data.split("/")[2];

  return ano + "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
  // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
};

exports.FormataStringDataToBoleto = (data) => {
  var dia = data.split("/")[0];
  var mes = data.split("/")[1];
  var ano = data.split("/")[2];

  return ("0" + dia).slice(-2) + "-" + ("0" + mes).slice(-2) + "-" + ano;
  // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
};

exports.formataMoeda = (valor) => {
  if (valor) {
    let currency = valor;
    let regex = /([+-]?[0-9|^.|^,]+)[\.|,]([0-9]+)$/gim;
    let result = regex.exec(currency);
    let floatResult = result ? result[1].replace(/[.,]/g, "") + "." + result[2] : currency.replace(/[^0-9-+]/g, "");
    return floatResult;
  } else {
    return 0;
  }
};

exports.decimalToMoney = (n, c, d, t) => {
  (c = isNaN((c = Math.abs(c))) ? 2 : c),
    (d = d == undefined ? "," : d),
    (t = t == undefined ? "." : t),
    (s = n < 0 ? "-" : ""),
    (i = parseInt((n = Math.abs(+n || 0).toFixed(c))) + ""),
    (j = (j = i.length) > 3 ? j % 3 : 0);
  return (
    "R$ " +
    s +
    (j ? i.substr(0, j) + t : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
    (c
      ? d +
        Math.abs(n - i)
          .toFixed(c)
          .slice(2)
      : "")
  );
};

exports.isValidDataDMY = (data) => {
  try {
    var dia = data.split("/")[0];
    var mes = data.split("/")[1];
    var ano = data.split("/")[2];
    //day and month must be two digits and year must be four digits
    if (dia.length !== 2 || mes.length !== 2 || ano.length !== 4) {
      return false;
    }
    //day and month must be numbers
    if (isNaN(dia) || isNaN(mes) || isNaN(ano)) {
      return false;
    }
    //day and month must be between 1 and 31
    if (dia < 1 || dia > 31 || mes < 1 || mes > 12) {
      return false;
    }
    //year must be between 1900 and 2099
    if (ano < 1900 || ano > 2099) {
      return false;
    }
    const date = ano + "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
    console.log(date);
    const retorno = moment(date).isValid();
    return retorno;
  } catch (e) {
    return false;
  }
};

exports.isValidPhone = (phone) => {
  //formato (99) 99999-9999
  //remove espaços
  phone = phone.replace(/\s/g, "");
  //remove hifens
  phone = phone.replace(/-/g, "");
  //remove paranteses
  phone = phone.replace(/\(/g, "");
  phone = phone.replace(/\)/g, "");
  //eleven numbers
  const regex = new RegExp(/^\d{11}$/);
  return regex.test(phone);
};

exports.formataPhone = (phone) => {
  //remove todos os caracteres exceto numeros
  phone = phone.replace(/[^\d]+/g, "");
  //return formated string (99) 99999-9999
  if (phone.length == 11) {
    return "(" + phone.slice(0, 2) + ") " + phone.slice(2, 7) + "-" + phone.slice(7, 11);
  }
  if (phone.length == 10) {
    //pega terceiro digito
    const terceiroDigito = phone.slice(2, 3);
    if (terceiroDigito >= 6) {
      return "(" + phone.slice(0, 2) + ") 9" + phone.slice(2, 6) + "-" + phone.slice(6, 10);
    } else {
      return "(" + phone.slice(0, 2) + ") " + phone.slice(2, 6) + "-" + phone.slice(6, 10);
    }
  }
  return "";
};

exports.formataMoedaFipe = (valor) => {
  if (valor) {
    console.log(valor);
    let currency = valor;
    let regex = /([+-]?[0-9|^.|^,]+)[\.|,]([0-9]+)$/gim;
    let result = regex.exec(currency);
    console.log("Regex result: " + result);
    let floatResult = result ? result[1].replace(/[.,]/g, "") + "." + result[2] : currency.replace(/[^0-9-+]/g, "");
    console.log("Final result: " + floatResult);
    return floatResult;
  } else {
    return 0;
  }
};

exports.decimalToMoney = (n, c, d, t) => {
  (c = isNaN((c = Math.abs(c))) ? 2 : c),
    (d = d == undefined ? "," : d),
    (t = t == undefined ? "." : t),
    (s = n < 0 ? "-" : ""),
    (i = parseInt((n = Math.abs(+n || 0).toFixed(c))) + ""),
    (j = (j = i.length) > 3 ? j % 3 : 0);
  return (
    "R$ " +
    s +
    (j ? i.substr(0, j) + t : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
    (c
      ? d +
        Math.abs(n - i)
          .toFixed(c)
          .slice(2)
      : "")
  );
};

exports.isValidCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj.length !== 14) {
    return false;
  }

  // Elimina CNPJs inválidos conhecidos
  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) {
    return false;
  }

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1))) {
    return false;
  }

  return true;
};

exports.tipoInscricao = (cpfCnpj) => {
  return cpfCnpj.length == 18 ? "02" : "01";
};

exports.cpfCnpj = (v) => {
  //Remove tudo o que não é dígito
  v = v.replace(/\D/g, "");

  if (v.length <= 11) {
    //CPF

    //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2");

    //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d)/, "$1.$2");

    //Coloca um hífen entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    //CNPJ

    //Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");

    //Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");

    //Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");

    //Coloca um hífen depois do bloco de quatro dígitos
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
  }

  return v;
};

exports.formataPlaca = (placa) => {
  placa = placa.replace("-", "");
  var formatado = placa.substr(0, 3) + "-";
  formatado += placa.substr(3, 4);
  return formatado.toUpperCase();
};

/**
 * Retorna objecto Error para o front
 * @param {string} errorMessage mensagem do erro
 * @param {object|number} error define os detalhes do erro
 * @returns objeto padrão do erro
 */
exports.returnObjectError = (errorMessage, error = 401) => {
  return {
    errorMessage,
    error,
  };
};

exports.formataPlacaTraco = (placa) => {
  placa = placa.replace(" ", "");
  const parte1 = placa.slice(0, 3);
  const parte2 = placa.slice(3, 7);
  return parte1 + "-" + parte2;
};

exports.getToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    return req.headers.authorization.split(" ")[1];
  } else return req.headers.authorization;
};

/**
 * @param { string } mensagem
 * @param { string } erro
 * @return { object }
 */
exports.mensagemErro = (mensagem, erro) => {
  return {
    obj: new ErrorRequestBuilder().setErrorMessage(mensagem).setError(erro).build(),
    status: STATUS_CODE.BAD_REQUEST,
  };
};

const isHttpSuccess = (statusCode) => {
  return statusCode >= 200 && statusCode < 300;
};

exports.makeCallBack = (callback, httpCode, retorno, mensagemRetorno = "") => {
  if (isHttpSuccess(httpCode)) {
    callback(null, httpCode, retorno);
  } else {
    let errorMessage = mensagemRetorno;
    if (retorno instanceof ValidationError) {
      errorMessage = retorno.message;
    }

    callback(new ErrorRequestBuilder().setErrorMessage(errorMessage).setError(retorno).build(), httpCode);
  }
};

exports.encryptSha1 = (password) => {
  return crypto.createHash("sha1").update(password).digest("hex");
};

exports.generateEncryptedPassword = async (password) => {
  try {
    const saltRounds = 10; // define o número de salt rounds
    const salt = await bcryptjs.genSalt(saltRounds);
    const hashPassword = await bcryptjs.hash(password, salt);
    return hashPassword;
  } catch (error) {
    console.error("Erro ao gerar a senha encriptada:", error);
    throw error;
  }
};

exports.comparePasswords = async (password, hashPassword) => {
  try {
    const isPasswordValid = await bcrypt.compare(password, hashPassword);
    return isPasswordValid;
  } catch (error) {
    console.error("Erro ao comparar senhas:", error);
    throw error;
  }
};

// Middleware de validação
exports.validateBody = (schema) => (req, res, next) => {
  try {
    console.log(req.body);
    schema.parse(req.body);
    next();
  } catch (e) {
    console.log(e);
    if (e.errors) {
      const formattedErrors = e?.errors?.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ errors: formattedErrors });
    }
  }
};

exports.isBoolean = (value) => {
  if (value === "false" || value === "0" || value === "" || value === null || value === undefined) {
    return false;
  }
  return true;
};

exports.isValidEmail = (email) => {
  //remove espaços
  email = email.replace(/\s/g, "");
  return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(email);
};

exports.generateGenericCompanyToken = async (companyId) => {
  const wsUser = await coreBase.makeSelect("users", {
    where: {
      companyId,
      active: 1,
    },
  });

  if (wsUser.length === 0) {
    return null;
  }

  const token = tokenService.createToken({ companyId, ...wsUser[0].dataValues, type: "company" }, "companyAPI");

  return token;
};

exports.generateGenericUserToken = async (cpf, companyId) => {
  try {
    const op = await coreBase.getOperators();
    
    const token = tokenService.createToken(payload, "user");

    return token;
  } catch (e) {
    console.log(e);
    return null;
  }
};


exports.enviaChunks = async (arrayDePromises, tamanho, tempoEspera) => {
  const grupos = [];
  for (let i = 0; i < arrayDePromises.length; i += tamanho) {
    const grupo = arrayDePromises.slice(i, i + tamanho).map((item) => {
      if (typeof item === "function") {
        return item();
      }
      return item;
    });

    const res = await Promise.allSettled(grupo);

    res.forEach((result, index) => {
      if (result.status === "rejected") {
        const reason = result.reason;

        // Verifica se há uma resposta com dados específicos do erro
        if (reason.response) {
          console.log(`🚨 Request ${index} failed:`);
          console.log("Status Code:", reason.response.status);
          console.log("Error Title:", reason.response.data.title || "No title provided");
          console.log("Error Message:", reason.response.data.message || "No message provided");
        } else {
          console.log(`🚨 Request ${index} failed with reason:`, reason.message || reason);
        }
      }
    });

    grupos.push(res);
    if (i + tamanho < arrayDePromises.length) {
      console.log(`Atualizando lote até índice ${i + tamanho} após ${tempoEspera} milisegundos de espera de um total de ${arrayDePromises.length} itens...`);
      await new Promise((resolve) => setTimeout(resolve, tempoEspera));
    }
  }
  return grupos;
};

exports.sendWhatsappMessage = async (messageData, evolutionId, evolutionEndPoint, evolutionApiKey) => {
  const { title, to, body } = messageData;
  const url = evolutionEndPoint + "message/sendText/" + evolutionId;
  try {
    const response = await axios.post(
      url,
      {
        number: to,
        options: {
          delay: 1200,
          presence: "composing",
          linkPreview: false,
        },
        textMessage: {
          text: `*${title}* 🚀.\n\n${body}`,
        },
      },
      {
        headers: {
          apikey: evolutionApiKey,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

exports.dataPorExtenso = () => {
  const data = new Date();
  const dia = data.getDate();
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  const mes = meses[data.getMonth()];
  const ano = data.getFullYear();

  return `${dia} de ${mes} de ${ano}`;
};

exports.returnAssociation = async (modelAssociations, arrayToShow, atributosFromAssociation) => {
  const arrayAssociations = [];
  arrayToShow.forEach((item) => {
    if (modelAssociations.includes(item)) {
      const objAssociation = {
        association: item,
      };
      if (atributosFromAssociation[item]) {
        if (atributosFromAssociation[item].attributes) objAssociation.attributes = atributosFromAssociation[item].attributes;
        if (atributosFromAssociation[item].required) objAssociation.required = atributosFromAssociation[item].required;
        if (atributosFromAssociation[item].include) objAssociation.include = atributosFromAssociation[item].include;
        if (atributosFromAssociation[item].where) objAssociation.where = atributosFromAssociation[item].where;
      }
      arrayAssociations.push(objAssociation);
    }
  });
  return arrayAssociations;
};