import Link from "next/link";
import Image from "next/image";
import { getFeatured } from "./actions/getFeatured";
import { getCategory } from "./actions/getCategory";


export default async function HomePage() {
  const featuredItems = await getFeatured();

  const categories = [
    "Home Decor",
    "Jewelry",
    "Clothing",
    "Art"
  ];

  return (
    <main>
      <section className="hero-wrapper">
        <div className="hero-image">
          <Image
            src="https://plus.unsplash.com/premium_photo-1679809447923-b3250fb2a0ce?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D"
            alt="Handcrafted items"
            fill
            className="hero-img"
            priority 
          />
        </div>
        <div className="hero-text">
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

      {await Promise.all(
        categories.map(async (category) => {
          const items = await getCategory(category);

          return (
            <section key={category} className="category-section">
              <div className="category-name">
                <h2>{category}</h2>
                <Link href={`/browse?category=${encodeURIComponent(category)}`} className="view-all-link">View All</Link>
              </div>

              <div className="category-items">
                {items.map((item: any) => (
                  <Link
                    key={item.id}
                    href={`/productDetails/${item.id}`}
                    className="category-item"
                  >
                    <div className="image-card-container">
                      {item.imageUrl && (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={300}
                          height={300}
                          className="image-card"
                        />
                      )}
                    </div>

                    <div className="card-content">
                      <h3 className="card-title">{item.name}</h3>
                      <p className="card-price">${item.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })
      )}
    </main>
  );
}
