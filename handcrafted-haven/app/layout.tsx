import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav className="nav">
            <Link href="/">Home</Link> 
            <Link href="/login">Login</Link> 
            <Link href="/browse">Browse</Link>
          </nav>

        <h1>Handcrafted Haven</h1>
      </header>
        {children}
      </body>
    </html>
  );
}