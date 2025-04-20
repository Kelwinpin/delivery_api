const { z } = require('zod')

exports.loginSchema = z.object({
    cnpj: z.string().min(14, "CNPJ inválido").max(14, "CNPJ inválido"),
    login: z.string(),
    password: z.string()
})