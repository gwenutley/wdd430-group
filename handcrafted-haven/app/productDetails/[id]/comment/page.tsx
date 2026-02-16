'use client';

import { addComment } from "./actions/addComment";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function CommentPage( ) {
    const params = useParams();
    const productId = Number(params.id);
    const [message, setMessage] = useState("");

    async function handleSubmit(formData: FormData) {
        try {
            await addComment(formData);
            setMessage("Your comment was submitted!");
        } catch (error: any) {
            setMessage(error.message || "Something went wrong");
        }
    }

    return (
        <main>
            <h2>Leave a Comment</h2>

            <form action={handleSubmit} className="comment-form">
                <input type="hidden" name="productId" value={productId} />

                <label>
                    Your Name:
                    <input type="text" name="userName" required />
                </label>

                <label>
                    Comment: 
                    <textarea name="comment" placeholder="Enter comment here..." required />
                </label>

                <button type="submit">Submit Comment</button>
            </form>

            {message && <p className="message">{message}</p>}
        </main>
    );
}