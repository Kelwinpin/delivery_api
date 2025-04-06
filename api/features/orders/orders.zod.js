const {z} = require('zod');

exports.insert = z.object({
    user_id: z.number(),
});
