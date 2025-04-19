const { z } = require('zod')

exports.loginSchema = z.object({
    cnpj: z.string().min(15).max(15),
    login: z.string(),
    password: z.string()
})