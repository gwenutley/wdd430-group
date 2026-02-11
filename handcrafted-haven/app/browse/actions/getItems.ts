'use server';
import { neon } from '@neondatabase/serverless';
import { cookies } from 'next/headers';

const sql = neon(process.env.DATABASE_URL!);

export async function getAllItems() {
    const items = await sql`
        SELECT id, title, description, price, category, image_url
        FROM products
        ORDER BY created_at DESC
    `;

    return items.map((item: any) => ({
        id: item.id,
        name: item.title,
        description: item.description,
        price: item.price,
        category: item.category,
        imageUrl: item.image_url || '',
    }));
}
