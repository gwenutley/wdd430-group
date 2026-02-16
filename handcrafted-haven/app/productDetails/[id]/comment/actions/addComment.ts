'use server';

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function addComment(formData: FormData) {
    const comment = formData.get('comment') as string;
    const userName = formData.get('userName') as string;
    const productId = formData.get('productId') as string;

    if (!productId || !comment || !userName) {
        throw new Error("Missing required form data");
    }

    const[product] = await sql`
        SELECT id FROM products WHERE id = ${parseInt(productId, 10)}
    `;

    if (!product) {
        throw new Error("Product not found");
    }

    await sql`
        INSERT INTO comments (product_id, user_name, comment)
        VALUES (${productId}, ${userName}, ${comment})
    `;
}