/* eslint-disable valid-jsdoc */
'use strict';

const coreBase = require('../../../base/utils/coreBase');
const { sendEmail } = require('../../../base/utils/emailSender');
const functions = require('../../../base/utils/functions');
const { lead } = require('../../../base/constants/hmtl/lead');

function generateLeadEmail(leadData) {
    return lead
        .replace(/{name}/g, leadData.name || 'Não informado')
        .replace(/{company}/g, leadData.company || 'Não informado')
        .replace(/{email}/g, leadData.email || 'Não informado')
        .replace(/{phone}/g, leadData.phone || 'Não informado')
        .replace(/{message}/g, leadData.message || 'Nenhuma mensagem')
        .replace(/{timestamp}/g, new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }));
}

const create = async (incomingData) => {
    try {
        console.log("🚀 ~ create ~ incomingData:", incomingData)

        const leadEmail = generateLeadEmail(incomingData);

        const email = await sendEmail(incomingData.email, 'Cadastro no sistema de entrega', 'Bem vindo!', leadEmail);

        return email;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    create,
};