const { z } = require('zod');

exports.insert = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    phone: z.string().min(3).max(100).optional().nullable(),
    company: z.string().min(3).max(100),
    message: z.string().min(3).max(100).optional().nullable(),
});