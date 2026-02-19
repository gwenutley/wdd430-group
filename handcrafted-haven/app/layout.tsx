import "./globals.css";
import Link from "next/link";
import NavBar from "./actions/navBar";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          < NavBar />

          <h1>Handcrafted Haven</h1>
        </header>
        {children}
      </body>
    </html>
  );
}