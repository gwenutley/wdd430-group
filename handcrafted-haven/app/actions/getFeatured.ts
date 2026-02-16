'use server';

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function getFeatured() {
  const items = await sql`
    SELECT id, title, price, image_url
    FROM products
    ORDER BY created_at DESC
    LIMIT 3
  `;

  return items.map((item: any) => ({
    id: item.id,
    name: item.title,
    price: item.price,
    imageUrl: item.image_url || '',
  }));
}