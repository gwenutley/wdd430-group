export default function SellPage() {
    return (
        <main>
            <h1>Sell Your Products</h1>
            <p>Share your unique items with our community</p>
            <section className="sell-section">
                <h2>Publish a Product</h2>
                <form className="sell-form">
                   <label>
                    Product Name:
                    <input type="text"/>
                   </label>

                   <label>
                    Description:
                    <textarea placeholder="Describe your product. . ." />
                   </label>

                   <label>
                    Category:
                    <select>
                        <option>Home Decor</option>
                        <option>Jewelry</option>
                        <option>Art</option>
                        <option>Clothing</option>
                        <option>Other</option>
                    </select>
                   </label>

                   <label>
                    Product Image:
                    <input type="file" />
                   </label>

                   <label>
                    Price:
                    <input type="number" step="0.01" />
                   </label>
                   
                   <button type="submit">Publish Product</button>
                </form>
            </section>
        </main>
    );
}