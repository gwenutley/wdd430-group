'use server';

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function getProduct(id: number) {

    const [product] = await sql`
        SELECT id, title, description, price, category, image_url, seller_id
        FROM products
        WHERE id = ${id}
    `;

    if (!product) {
        return null;
    }

    return {
        id: product.id,
        name: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        imageUrl: product.image_url || '',
        seller_id: product.seller_id
    };
}