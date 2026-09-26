import { z } from 'zod';

export const nameSchema = z.string().min(2);

export const signUpSchema = z.object({
  name: nameSchema,
  email: z.email(),
  password: z.string().min(5).max(30),
  termsAndGuidelinesAccepted: z.literal(true),
});

export const signUpClientSchema = signUpSchema
  .extend({
    termsAndGuidelinesAccepted: z.boolean().refine((value) => value === true),
    confirmPassword: z.string().min(5).max(30),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(5).max(30),
});

export const signInClientSchema = signInSchema.extend({});

export const changePersonalDetailsSchema = z.object({
  name: nameSchema,
});
