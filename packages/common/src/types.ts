import z from "zod";
import { ZodString } from "zod/v4";


export const SignupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(20),
    name: z.string().min(3).max(20),
    photo: z.string().optional()
});

export const SigninSchema = z.object({
    email: z.string().min(3).max(20),
    password: z.string().min(3).max(20)
});

export const RoomSchema = z.object({
    slug: z.string(),
    adminId:z.string().uuid()
})
