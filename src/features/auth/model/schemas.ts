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

export const changePersonalDetailsClientSchema =
  changePersonalDetailsSchema.extend({
    email: z.email().optional(),
  });

export const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(5).max(30),
});

export const changePasswordClientSchema = changePasswordSchema
  .extend({
    confirmNewPassword: z.string().min(5).max(30),
  })
  .superRefine(({ confirmNewPassword, newPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmNewPassword'],
      });
    }
  });

export const accountDeletionSchema = z.object({
  reason: z.string().max(500).optional(),
});

export const accountDeletionClientSchema = accountDeletionSchema;
