"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("buyer");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage("Please enter email and password");
            return;
        }

        if(role === "buyer") {
            setMessage(`Logged in as Buyer: ${email}`);
        } else {
            setMessage(`Logged in as Seller: ${email}`);
        }

        setEmail("");
        setPassword("");
    };

    return (
        <main>
            <h1>Login</h1>
            <p>Enter your info to access your account</p>
            <section className="login-section">
                <form className="login-form">
                    <label>
                        First Name:
                        <input type="text" />
                    </label>

                    <label>
                        Last Name:
                        <input type="text" />
                    </label>

                    <label>
                        Email:
                        <input type="email" />
                    </label>

                    <label>
                        Account Type:
                        <select>
                            <option>Buyer</option>
                            <option>Seller</option> 
                        </select>
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