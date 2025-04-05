const { z } = require('zod');

exports.insert = z.object({
  name: z.string().min(3).max(100),
  cnpj: z.string().min(14).max(14),
  logo: z.string().min(3).max(100),
  active: z.boolean(),
});

