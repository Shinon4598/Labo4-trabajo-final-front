import z from "zod";

export const schema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Introduce un email válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .regex(/[a-z]/, { message: "La contraseña debe tener al menos una letra minúscula" })
    .regex(/[A-Z]/, { message: "La contraseña debe tener al menos una letra mayúscula" })
    .regex(/[0-9]/, { message: "La contraseña debe tener al menos un número" })
    .regex(/[^a-zA-Z0-9\s]/, { message: "La contraseña debe tener al menos un símbolo" })
    .regex(/^\S*$/, { message: "La contraseña no debe contener espacios" }),
});