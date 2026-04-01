import z, { email } from "zod";


export const SignupSchema = z.object({
    email:z.email(),
    password:z.string().min(3).max(20),
    name:z.string().min(3).max(20),
    photo:z.string()
});

export const SigninSchema = z.object({
      email:z.string().min(3).max(20),
      password:z.string().min(3).max(20)
}) ;

export const RoomSchema = z.object({
     slug:z.string(),
     adminId:z.string(),
     createdAt:z.date()
})
