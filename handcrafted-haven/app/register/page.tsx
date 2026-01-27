export default function RegisterPage() {
    return (
        <main>
            <h2>Register Account</h2>
            <section className="register-section">
                <form className="register-form">
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
                        Password:
                        <input type="password" />
                    </label>

                    <label>
                        Account Type:
                        <select>
                            <option>Buyer</option>
                            <option>Seller</option> 
                        </select>
                    </label>

                    <button type="submit">Register</button>
                </form>
            </section>
        </main>
    );
}