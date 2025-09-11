const { z } = require("zod");

exports.insert = z.object({ 
  companyId: z.number({
    required_error: "ID da empresa é obrigatório",
  }),
  href: z.string().url("Link deve ser uma URL válida").optional().or(z.literal("")),
  type: z.string().optional(),
  image: z.string().url("URL da imagem deve ser válida").max(500, "URL deve ter no máximo 500 caracteres").optional(),
});