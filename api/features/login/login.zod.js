const { z } = require('zod')

exports.loginSchema = z.object({
    cnpj: z.string().min(14).max(14),
    login: z.string(),
    password: z.string()
})