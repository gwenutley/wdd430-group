'use server';
import { neon } from '@neondatabase/serverless';

//sql function
const sql = neon(process.env.DATABASE_URL!);

//contact the seller 
export async function contactSeller(formData: FormData) {
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;
    const productId = formData.get('productId') as string;
    
    if (!productId || !email || !phone) {
        throw new Error('Missing required fields');
    }

    //get the seller id
    const [product] = await sql`
        SELECT seller_id
        FROM products
        WHERE id = ${parseInt(productId, 10)}
    `;

    if (!product) {
        throw new Error('Product not found');
    }

    // Store contact request
    await sql`
        INSERT INTO contact_requests (product_id, seller_id, buyer_email, buyer_message, buyer_phone)
        VALUES (${productId}, ${product.seller_id}, ${email}, ${message}, ${phone})
    `;
}