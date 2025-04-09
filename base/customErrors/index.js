// Define the CustomError class
class CustomError extends Error {
    constructor(error) {
      super(error.message);
      this.status = error.status;
      this.title = error.title;
    }
  }
  
  // Define the custom error objects
  const invalidLogin = {
    status: 400,
    message: "Confira se os campos de login ou senha estão preenchidos corretamente.",
    title: "Login ou senha invalida.",
  };
  
  const inactiveCompany = {
    status: 400,
    message: "Cliente se encontra no estado inativo.",
    title: "Cliente inativo.",
  };
  
  const tokenNotFounded = {
    status: 401,
    message: "Token de requisição não enviado.",
    title: "Token não encontrado.",
  };
  
  const invalidToken = {
    status: 401,
    message: "Token de requisição expirado ou inválido.",
    title: "Token inválido.",
  };
  
  const invalidModuleToken = {
    status: 402,
    message: "Suas permissões proíbem o acesso a esse módulo.",
    title: "Modulo bloqueado.",
  };
  
  const fatherNotFounded = {
    status: 400,
    message: "CPF pai não encontrado",
    title: "Pai não encontrado",
  };
  
  const fatherHasADependenceFounded = {
    status: 400,
    message: "O CPF pai não pode ser de um dependente",
    title: "CPF Passado é dependente",
  };
  
  const MaxDependence = {
    status: 400,
    message: "Cada CPF deve haver no maximo 4 dependentes",
    title: "Numero maximo de dependente atingido",
  };
  
  // Export the CustomError class and custom error objects
  module.exports = {
    CustomError,
    invalidLogin,
    inactiveCompany,
    tokenNotFounded,
    invalidToken,
    invalidModuleToken,
    fatherNotFounded,
    fatherHasADependenceFounded,
    MaxDependence,
  };