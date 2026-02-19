import { neon } from "@neondatabase/serverless";
import Link from "next/link";
import Image from "next/image";

const sql = neon(process.env.DATABASE_URL!);

type PageProps = {
    params: Promise<{ id: string }>;
}

export default async function SellerPage({ params }: PageProps) {
    const { id } = await params;
    const sellerId = Number(id);

    if (isNaN(sellerId)) {
        return <p>Invalid Seller</p>
    }

    const seller = await sql`
        SELECT id, user_name, bio
        FROM users
        WHERE id = ${sellerId}
    `;

    if(seller.length === 0) {
        return <p>Seller not found</p>
    }

    const products = await sql`
        SELECT id, title, price, image_url
        FROM products
        WHERE seller_id = ${sellerId}
    `;

    return (
        <main className="bproduct-details-page">
            <h2>{seller[0].user_name}'s Shop</h2>

            {seller[0].bio && (
                <section className="seller-public-bio">
                    <h3>About the Seller</h3>
                    <p>{seller[0].bio}</p>
                </section>
            )}

            {products.length === 0 ? (
            <p>No products found for this seller.</p>
            ) : (
            <ul className="product-grid">
                {products.map((product: any) => (
                <li key={product.id} className="card">
                    <Link
                    href={`/productDetails/${product.id}`}
                    className="seller-product-card"
                    >
                    <h3 className="title">{product.title}</h3>

                    {product.image_url && (
                        <div className="image-container">
                        <Image
                            src={product.image_url}
                            alt={product.title}
                            width={200}
                            height={200}
                            className="card-image"
                        />
                        </div>
                    )}

                    <div className="product-details">
                        <p className="description">{product.description}</p>
                        <p className="price">Price: ${product.price}</p>
                    </div>
                    </Link>
                </li>
                ))}
            </ul>
            )}
        </main>
    );
}
