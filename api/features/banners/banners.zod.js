const { z } = require("zod");

exports.insert = z.object({ 
  title: z.string().max(50, "Título deve ter no máximo 50 caracteres").optional(),
  href: z.string().url("Link deve ser uma URL válida").optional().or(z.literal("")),
  type: z.string().optional(),
  image: z.string().url("URL da imagem deve ser válida").max(500, "URL deve ter no máximo 500 caracteres").optional(),
  startDate: z.date().optional().or(z.string().optional()),
  endDate: z.date().optional().or(z.string().optional()),
});