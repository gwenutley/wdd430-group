'use server';
import { neon } from '@neondatabase/serverless';
import { cookies } from 'next/headers';

//sql function
const sql = neon(process.env.DATABASE_URL!);

//login the user
export async function loginUser(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const users = await sql 
    `SELECT id, account_type
    FROM users
    WHERE email = ${email} AND password = ${password}
    `;

    const user = users[0];

    if(!user) {
        throw new Error('Invalid credentials');
    }

    const cookieStore = await cookies();

    cookieStore.set('user_id', String(user.id), {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
    });

        cookieStore.set('account_type', user.account_type, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
    });

    return {
        accountType: user.account_type,
        userId: user.id,
    };
}