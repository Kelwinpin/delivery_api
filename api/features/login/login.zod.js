const { z } = require('zod')

exports.login = {
    cnpj: z.string().min(14).max(14),
    login: z.string(),
    password: z.string
}