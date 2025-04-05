module.exports = {
    notFound: entity => `${entity} não encontrada.`,
    createFailed: action => `Falha ao ${action}.`,
    updateFailed: action => `Falha ao atualizar ${action}.`,
    fetchFailed: entity => `Falha ao buscar ${entity}.`,
    fetchByIdFailed: entity => `Falha ao buscar ${entity} por ID.`,
    deleteFailed: entity => `Falha ao deletar ${entity}.`,
  };