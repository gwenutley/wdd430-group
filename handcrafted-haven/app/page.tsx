import Link from "next/link";

export default function HomePage() {
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
      <p>Welcome to Handcrafted Haven, Discover items made by talented artisans</p>
    </main>
  );
}
