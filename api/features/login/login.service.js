'use strict';

const crypto = require('crypto');
const tokenService = require('../../../base/auth/token');
const coreBase = require('../../../base/utils/coreBase');
const { CustomError, invalidLogin } = require('../../../base/customErrors');
const dotenv = require('dotenv');
dotenv.config();


const doLogin = async (dataToFind) => {
    try {
        const passwordHash = crypto
            .createHash('sha1')
            .update(dataToFind.password)
            .digest('hex');

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
                    cpf: dataToFind.cpf,
                    password: passwordHash,
                    companyId: company[0].id,
                },
            },
        );

        if (!user) throw new CustomError(invalidLogin);
        const payload = { ...user.dataValues };
        const token = tokenService.createToken(payload, process.env.DELIVERY_SECRET_KEY);

        return token;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    doLogin,
};