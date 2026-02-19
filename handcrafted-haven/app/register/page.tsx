'use client';

import { registerUser } from './actions/registerUser';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        const formData = new FormData(e.currentTarget);

        try {
            await registerUser(formData);
            router.push('/login');
        } catch (err: any) {
            setError(err.message || "Registration failed. Please try again.");
        }
    }

    return (
        <main>
            <h2>Register Account</h2>
            <section className="register-section">
                <form action={registerUser} className="register-form">
                    <label>
                        First Name:
                        <input type="text" name="firstName" required />
                    </label>

                    <label>
                        Last Name:
                        <input type="text" name="lastName" required />
                    </label>

                    <label>
                        Email:
                        <input type="email" name="email" required />
                    </label>

                    <label>
                        Password:
                        <input type="password" name="password" required />
                    </label>

                    <label>
                        Account Type:
                        <select name="accountType" required>
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option> 
                        </select>
                    </label>

                    <button type="submit">Register</button>
                </form>
            </section>
        </main>
    );
}