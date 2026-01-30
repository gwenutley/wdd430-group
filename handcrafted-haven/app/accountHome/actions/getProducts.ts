'use server';
import { neon } from '@neondatabase/serverless';
import { cookies } from 'next/headers';

const sql = neon(process.env.DATABASE_URL!);

export async function getProducts() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('user_id')?.value;
    if(!userId) {
        throw new Error('User not logged in');
    }

    const products = await sql`
    SELECT id, seller_id, title, description, price, category, image_url
    FROM products
    WHERE seller_id = ${parseInt(userId, 10)}
    ORDER by created_at DESC
    `;

    return products;
}