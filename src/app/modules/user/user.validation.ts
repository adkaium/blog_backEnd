import { z } from 'zod';

// Validation for user registration
 const registerUserSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(3, 'Name must be at least 3 characters long')
      .max(20, 'Name must not exceed 20 characters'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least  characters long'),
  }),
});

// Validation for user login
 const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email format"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),
  }),
});



// Validation for updating user
 const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
  })
});


export const userValidation = {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
};