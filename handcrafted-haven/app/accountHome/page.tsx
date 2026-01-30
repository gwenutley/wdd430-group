import Link from "next/link";
import { getProducts } from "./actions/getProducts";

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
                    <ul>
                        {products.map((product: any) => (
                            <li key={product.id}>
                                <h3>{product.title}</h3>
                                {product.image_url && <img src={product.image_url} alt={product.title} width={200} />}
                                <p>{product.description}</p>
                                <p>Price: ${product.price}</p>
                                <p>Category: {product.category}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
