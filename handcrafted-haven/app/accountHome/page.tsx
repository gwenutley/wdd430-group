export const dynamic = 'force-dynamic';
export const fetchCache = "force-no-store";

import Link from "next/link";   
import { getProducts } from "./actions/getProducts";
import { deleteProduct } from "./actions/getProducts";
import Image from "next/image";
import { neon } from '@neondatabase/serverless';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const sql = neon(process.env.DATABASE_URL!);

export default async function AccountPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('user_id')?.value;
    const accountType = cookieStore.get('account_type')?.value;

    if (!userId || accountType !== "seller") {
        redirect('/login');
    }

    const sellerId = parseInt(userId, 10);

    const seller = await sql`
        SELECT id, user_name, bio
        FROM users
        WHERE id = ${sellerId}
    `;

    let products: any[] = [];
    try {
        products = await getProducts();
    } catch (error) {
        console.error(error)
    }

    return (
        <main>
            <section>
                <section className="seller-bio-section">
                    <h2>My Story</h2>
                    <form action={async (formData) => {
                        "use server";

                        const newBio = formData.get("bio") as string;

                        await sql`
                            UPDATE users
                            SET bio = ${newBio}
                            WHERE id = ${userId}
                        `;
                    }}>
                        <textarea
                            name="bio"
                            defaultValue={seller[0]?.bio || ""}
                            placeholder="Tell buyers about yourself and your work. . ."
                            rows={6}
                        />

                        <button type="submit">Save Story</button>
                    </form>
                </section>
                <h2 className="product-head">My Products</h2>
                <Link href="/accountHome/messages" className="messages-link">View Messages</Link>
                <Link href="/sell" className="sell-link">Add a Product</Link>
                {products.length === 0 ? (
                    <p>You have not listed any products yet.</p>
                ) : (
                    <ul className="product-grid">
                        {products.map((product: any) => (
                            <li key={product.id} className="card">
                                <h3 className="title">{product.title}</h3>
                                {product.image_url && 
                                    <div className="image-container">
                                        <Image
                                            src={product.image_url} 
                                            alt={product.title} 
                                            fill 
                                            className="item-image"
                                        />
                                    </div>
                                }
                                <div className="product-details">
                                    <p className="description">{product.description}</p>
                                    <p className="price">Price: ${product.price}</p>
                                    <p className="category">Category: {product.category}</p>
                                    <form className="form-delete" action={async () => {
                                        "use server";
                                        await deleteProduct(product.id);
                                    }}>
                                        <button type="submit" className="delete-button">
                                            Delete Product
                                        </button>
                                    </form>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
