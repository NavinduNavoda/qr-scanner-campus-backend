import { rolesAsc } from '../../auth/functions/auth.roles';
import {z} from 'zod';

export const RegisterValidator = {
    username: z.string().min(3),
    password: z.string().min(6),

    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    sc_number: z.string().optional(),
    role: z.string().min(1).refine(value => rolesAsc.includes(value), {
        message: 'Invalid user type'
    }),
};

export const LoginValidator = {
    username: z.string().min(3),
    password: z.string().min(6),
};

