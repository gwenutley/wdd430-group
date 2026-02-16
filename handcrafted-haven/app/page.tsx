import Link from "next/link";
import Image from "next/image";
import { getFeatured } from "./actions/getFeatured";

export default async function HomePage() {
  const featuredItems = await getFeatured();

  return (
    <main>
      <header>
        <nav className="nav">
          <Link href="/">Home</Link> 
          <Link href="/sell">Sell</Link> 
          <Link href="/login">Login</Link> 
          <Link href="/browse">Browse</Link>
        </nav>

        <h1>Handcrafted Haven</h1>
      </header>
      <section className="hero">
        <Image
            src="/images/hero.jpg"
            alt="Handcrafted items"
            width={1200}
            height={400}
            className="hero-img"
          />
        <div className="hero-image">
          <p>Welcome to Handcrafted Haven, Discover items made by talented artisans</p>
          <Link href="/browse" className="browse-link">Browse Now</Link>
        </div>
      </section>

      <section className="featured">
        <h2>Featured Items</h2>
        <div className="featured-items">
          {featuredItems.map((item: any) => (
            <Link key={item.id} href={`/productDetails/${item.id}`} className="featured-item">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={300}
                height={300}
                className="featured-img"
              />
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
          </Link>
          ))}
        </div>
      </section>
      
    </main>
  );
}
