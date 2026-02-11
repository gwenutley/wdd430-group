import Link from "next/link";
import { getProducts } from "./actions/getProducts";
import { deleteProduct } from "./actions/getProducts";
import Image from "next/image";

export default async function AccountPage() {
    let products: any[] = [];
    try {
        products = await getProducts();
    } catch (error) {
        console.error(error)
    }

    return (
        <main>
            <header>
                <nav className="nav">
                <Link href="/">Home</Link> 
                <Link href="/sell">Sell</Link> 
                <Link href="/login">Login</Link> 
                <Link href="/browse">Browse</Link>
                </nav>

                <h1>My Account</h1>
            </header>
            <section>
                <h2>My Products</h2>
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
