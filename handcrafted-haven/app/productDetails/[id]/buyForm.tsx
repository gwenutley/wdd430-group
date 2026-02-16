"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { contactSeller } from "./actions/contactSeller";

type Props = {
    productId: number;
}

export default function BuyForm({ productId }: Props) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(formData: FormData) {
    try {
      await contactSeller(formData);
      setMessage("Your information was sent to the seller!");
    } catch (error: any) {
      setMessage(error.message || "Something went wrong");
    }
  }

    return (
        <main>
            <h2>Buy Form</h2>
            <p>Contact Seller here</p>
            <section className="buy-section">
                <button className="buy" onClick={() => setOpen(!open)}>Buy Now</button>

                {open && (
                    <form action={handleSubmit} className="buy-form">
                        <input type="hidden" name="productId" value={productId} />
                        <label>
                            Name:
                            <input type="text" name="name" required/>
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" required/>
                        </label>
                        <label>
                            Phone Number:
                            <input type="tel" name="phone" required/>
                        </label>
                        <label>
                            Message:
                            <textarea name="message" placeholder="Write a message to the seller. . ." />
                        </label>

                        <button type="submit">Send to Seller</button>    
                    </form>
                )}

                {message && <p className="message">{message}</p>}
            </section>
        </main>
    )
}

