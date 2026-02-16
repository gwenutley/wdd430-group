'use server';

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export type Comment = {
    id: number;
    user_name: string;
    comment: string;
    created_at: string;
};

export async function getRandomComments(productId: number): Promise<Comment[]>  {
    const comments = await sql`
        SELECT id, user_name, comment, created_at
        FROM comments
        WHERE product_id = ${productId}
        ORDER BY RANDOM()
        LIMIT 3
    `;

    return comments as Comment[];
}

