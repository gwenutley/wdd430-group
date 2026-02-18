'use client';

import {useState} from 'react';
import { createProduct } from '../actions/newProduct';

export default function SellForm() {
    const [message, setMessage] = useState('');

    async function handleSubmit(formData: FormData) {
        try {
            await createProduct(formData);
            setMessage('Product created successfully!');
        } catch (error: any) {
            setMessage(error.message || 'Failed to create product');
        }
    }

    return (
        <main>
            <section className="sell-section">
                <h2>Publish a Product</h2>
                <form className="sell-form" action={handleSubmit}>
                   <label>
                    Product Name:
                    <input type="text" name="title" required/>
                   </label>

                   <label>
                    Description:
                    <textarea placeholder="Describe your product. . ." name="description" required />
                   </label>

                   <label>
                    Category:
                    <select name="category" required>
                        <option>Home Decor</option>
                        <option>Jewelry</option>
                        <option>Art</option>
                        <option>Clothing</option>
                        <option>Other</option>
                    </select>
                   </label>

                   <label>
                    Product Image URL:
                    <input type="text" name="image_url" placeholder="https://image.example.com/image.jpg" />
                   </label>

                   <label>
                    Price:
                    <input type="number" step="0.01" name="price" required />
                   </label>
                   
                   <button type="submit">Publish Product</button>
                </form>

                {message && <p className="message">{message}</p>}
            </section>
        </main>
    );
}