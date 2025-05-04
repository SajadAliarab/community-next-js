import {z} from 'zod'

export const UserCreateSchema = z.object({
    email: z.string().email('Invalid Email'),
    password: z.string()
                .min(8,'Password must be at least 8 characters long')
                .max(32,'Password cannot exceed 32 characters')
                .regex(/^(?=.*[a-z])/,  'Password must have at least one small letter')
                .regex(/^(?=.*[A-Z])/,  'Password must have at least one capital letter')
                .regex(/^(?=.*\d)/,     'Password must have at least one number')
                .regex(/^(?=.*[\W_])/,  'Password must have at least one special character (@ ? ! $ ,...)'),
    userName: z.string().min(5,'User name mus be at least 5 character long '),
    type: z.enum(['USER','ADMIN','MODERATOR'])             
})
export type UserFormData = z.infer<typeof UserCreateSchema>

export const UserUpdateSchema =  z.object({
    email: z.string().email('Invalid Email'),
    userName: z.string().min(5,'User name mus be at least 5 character long '),
    type: z.enum(['USER','ADMIN','MODERATOR'])             
})
export type UserUpdateFormData = z.infer<typeof UserUpdateSchema>
