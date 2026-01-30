'use server';
import { neon } from '@neondatabase/serverless';

// type-safe sql function
const sql = neon(process.env.DATABASE_URL!);

export async function registerUser(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const accountType = formData.get('accountType') as string;

  await sql
    `
    INSERT INTO users (email, password, account_type)
    VALUES (${email}, ${password}, ${accountType})
    `;
}
