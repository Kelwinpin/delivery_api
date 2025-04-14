const { z } = require('zod');

exports.insert = z.object({
  login: z.string().min(3).max(100),
  password: z.string(),
  companyId: z.number(),
});