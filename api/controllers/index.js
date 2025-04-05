'use strict';
const regex = new RegExp('^[0-9a-fA-F]{24}$');

exports.isValidID = (id) => {
  if (!id) return false;
  return regex.test(id);
};

exports.execute = (req, res, func) => {
  func(req, res, (err, code, ret) => execCallback(res, err, code, ret));
};

function execCallback(res, err, code, ret) {
  if (err) {
    // Não retorna a msg de erro original para o client caso seja um erro interno
    if (code >= 500) {
      ret = {
        error: 'Internal Server Error.',
      };
    } else {
      ret = err;
    }

    // Exibir o erro
    //console.error(err);
  }

  if (ret && code != 204) {
    res.status(code).send(ret);
  } else {
    res.sendStatus(code);
  }
}