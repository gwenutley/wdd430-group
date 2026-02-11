'use server';
import { neon } from '@neondatabase/serverless';
import { cookies } from 'next/headers';

const sql = neon(process.env.DATABASE_URL!);

export async function createProduct(formData: FormData) {
    //get seller id and check they're sellers logged in
    const cookieStore = await cookies();

    const userId = cookieStore.get('user_id')?.value;
    const accountType = cookieStore.get('account_type')?.value;

    if(!userId) {
        throw new Error('User not logged in');
    }

    if(accountType !== 'seller') {
        throw new Error('Only sellers can create products');
    }

    //set all the fields in the form and insert into database
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const category = formData.get('category') as string;
    const imageUrlRaw = formData.get('image_url') as string | null;
    const imageUrl = imageUrlRaw?.trim() || null;
    const sellerId = parseInt(userId, 10);

    //check the image url is valid 
    if (imageUrl && !imageUrl.startsWith('http')) {
    throw new Error('Image URL must be a valid URL');
    }

    //check the form is filled out
    if(!title || !description || !price || !category) {
        throw new Error('All fields are required');
    }

    await sql`
    INSERT INTO products (seller_id, title, description, price, category, image_url)
    VALUES (${sellerId}, ${title}, ${description}, ${price}, ${category}, ${imageUrl})`;
}