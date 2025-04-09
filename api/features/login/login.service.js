'use strict';

const tokenService = require('../../../base/auth/token');
const coreBase = require('../../../base/utils/coreBase');
const functions = require('../../../base/utils/functions');
const { CustomError, invalidLogin } = require('../../../base/customErrors');
const dotenv = require('dotenv');
dotenv.config();


const doLogin = async (dataToFind) => {
    try {
        const passwordHash = await functions.generateEncryptedPassword(dataToFind.password)

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
                    password: passwordHash,
                    companyId: company[0].dataValues.id,
                },
            },
        );

        if (!user) throw new CustomError(invalidLogin);
        const payload = { ...user.dataValues };
        console.log("🚀 ~ doLogin ~ payload:", payload)
        const token = tokenService.createToken(payload, "delivery");

        return token;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    doLogin,
};