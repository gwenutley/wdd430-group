'use server';

import {use } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProduct } from "./actions/getProduct";

type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
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
            />
          )}
        </div>

        <div className="product-info">
          <h1 className="title">{product.name}</h1>
          <p className="description">{product.description}</p>
          <p className="category">Category: {product.category}</p>
          <p className="price">Price: ${product.price}</p>

          <div className="links">
            <Link href="#" className="buy">Buy Now</Link>
            <br />
            <Link href="/browse" className="back-link">Back to Browse</Link>
          </div>
        </div>
      </div>
    </main>
  );
}