'use server';

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function getCategory(category: string) {
    const items = await sql`
        SELECT id, title, price, image_url
        FROM products
        WHERE category = ${category}
        ORDER BY RANDOM()
        LIMIT 2
    `;

    return items.map((item: any) => ({
        id: item.id,
        name: item.title,
        price: item.price,
        imageUrl: item.image_url || '',
    }));
}