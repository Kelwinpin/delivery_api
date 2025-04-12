'use strict';

const tokenService = require('../../../base/auth/token');
const coreBase = require('../../../base/utils/coreBase');
const functions = require('../../../base/utils/functions');
const { CustomError, invalidLogin } = require('../../../base/customErrors');
const dotenv = require('dotenv');
dotenv.config();


const doLogin = async (dataToFind) => {
    try {
        const company = await coreBase.makeSelect(
            'companies',
            {
                where: {
                    cnpj: dataToFind.cnpj,
                },
                attributes: ['id'],
            }
        )
        
        const user = await coreBase.makeSelect(
            'users',
            {
                where: {
                    cpf: dataToFind.login,
                    companyId: company[0].dataValues.id,
                },
            },
        );

        const authenticate = await functions.comparePasswords(dataToFind.password, user[0].dataValues.password);
        
        if (!user) throw new CustomError(invalidLogin);
        if (!authenticate) throw new CustomError(invalidLogin);

        const payload = { ...user[0].dataValues };
        delete payload.password;
        const token = tokenService.createToken(payload, "delivery");

        return token;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    doLogin,
};