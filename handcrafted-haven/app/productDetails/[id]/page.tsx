'use server';

import {use } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProduct } from "./actions/getProduct";
import BuyForm from "./buyForm";
import { getRandomComments } from "./actions/getRandomComments";

type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  seller_id: number;
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) {
    return <p>Invalid product ID</p>;
  }

  const product: Product | null = await getProduct(productId);

  if (!product) {
    return <p>Product not found</p>;
  }

  const comments = await getRandomComments(productId);

  return (
    <main className="product-detail-page">
      <div className="product-container">
        <div className="image-wrapper">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={600}
              className="product-image"
              priority
            />
          )}
        </div>

        <div className="product-info">
          <h1 className="title">{product.name}</h1>
          <p className="description">{product.description}</p>
          <p className="category">Category: {product.category}</p>
          <p className="price">Price: ${product.price}</p>

          <div className="links">
            <Link href={`/seller/${product.seller_id}`} className="seller-link">View Seller Profile</Link>
            <Link href="/browse" className="back-link">Back to Browse</Link>
          </div>
        </div>
        <BuyForm productId={product.id} />
        <div className="comments-section">
            <h2>Recent Comments</h2>
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              <ul className="comments-list">
                {comments.map((comment: any) => (
                  <li key={comment.id} className="comment-card">
                    <p className="comment-user"><strong>{comment.user_name}</strong> says:</p>
                    <p className="comment-text">{comment.comment}</p>
                  </li>
                ))}
              </ul>
            )}
            <Link className="comment-button" href={`/productDetails/${product.id}/comment`}>Leave a Comment</Link>
          </div>
      </div>
    </main>
  );
}