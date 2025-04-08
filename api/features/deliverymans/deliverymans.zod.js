const { z } = require('zod');

exports.insert = z.object({
    name: z.string(),
    cpf: z.string().min(11).max(11),
    image: z.string().optional().nullable(),
    companyId: z.number(),
});