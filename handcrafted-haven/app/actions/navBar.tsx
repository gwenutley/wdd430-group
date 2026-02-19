import Link from "next/link";
import { cookies } from "next/headers";
import { logout } from "@/app/actions/logout";

export default async function NavBar() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;
    const accountType = cookieStore.get('account_type')?.value;

    return (
        <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/browse">Browse</Link>
            <Link href="/login">Login</Link>
            {accountType === 'seller' && <Link href="/sell">Sell</Link>}
            {accountType === 'seller' && <Link href="/accountHome">Account Home</Link>}
            {userId && (
                <form action={logout}>
                <button type="submit" className="logout-button">
                    Logout
                </button>
                </form>
            )}
        </nav>
    );
}