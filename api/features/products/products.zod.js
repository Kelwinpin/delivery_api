const {z} = require('zod');

exports.insert = z.object({
  name: z.string().min(3).max(100),
  amount: z.number(),
  price: z.number(),
});