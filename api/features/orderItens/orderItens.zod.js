const { z } = require('zod');

exports.insert = z.object({
    orderId: z.number(),
    productId: z.number(),
    amount: z.number(),
    observation: z.string().optional().nullable(),
    price: z.number(),
});