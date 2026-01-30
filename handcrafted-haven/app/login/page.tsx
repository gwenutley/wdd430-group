"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "./actions/loginUser";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage("Please enter email and password");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);

            const user = await loginUser(formData);

            if (user.accountType === "buyer") {
                setMessage(`Welcome, you are logged in as a Buyer.`);
                router.push("/");
            } else if (user.accountType === "seller") {
                setMessage(`Welcome, you are logged in as a Seller.`);
                router.push("/sell");
            }

            setEmail("");
            setPassword("");
        } catch (error: any) {
            setMessage(error.message || "login didn't work");
        }
    };

    return (
        <main>
            <h1>Login</h1>
            <p>Enter your info to access your account</p>
            <section className="login-section">
                <form className="login-form" onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </label>

                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </label>
                        
                    <button type="submit">Login</button>    
                    
                    <p className="message">{message}</p>

                    <p>
                        Don't have an account?{" "}
                        <Link href="/register" className="signup-link">
                        Register
                        </Link>
                    </p>
                </form>
            </section>
        </main>
    )
}