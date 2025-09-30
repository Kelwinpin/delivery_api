const { z } = require('zod');

exports.insert = z.object({
  name: z.string().min(3).max(100),
  cpf: z.string().min(11).max(11),
  address: z.string().min(3).max(100),
  password: z.string(),
  email: z.string().email(),
  phone: z.string(),
  companyId: z.number(),
});