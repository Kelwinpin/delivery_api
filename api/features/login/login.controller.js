'use strict'
const loginService = require('./login.service');
const functions = require('../../../base/utils/functions');
const {
    STATUS_CODE,
} = require('../../../base/constants/general/http-status-codes');

exports.makeLogin = async (req, _, callback) => {
    try {
        const { body } = req;
        const token = await loginService.doLogin(body);

        functions.makeCallBack(callback, STATUS_CODE.OK, token);
    } catch (error) {
        const errorMessage = 'Falha ao Fazer Login';
        functions.makeCallBack(
            callback,
            STATUS_CODE.BAD_REQUEST,
            error,
            errorMessage,
        );
    }
};