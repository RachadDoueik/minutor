import { z } from 'zod';

export const UpdateUserSchema = z.object({
    username: z.string().optional(),
    email: z.email(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>