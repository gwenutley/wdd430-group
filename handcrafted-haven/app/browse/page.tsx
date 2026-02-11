"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getAllItems } from "./actions/getItems";
import Link from "next/link";

export type Item = {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    imageUrl: string;
};

export default function BrowsePage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [items, setItems] = useState<Item[]>([]);
    
    useEffect(() => {
        async function fetchItems() {
            try {
                const items = await getAllItems();
                setItems(items);
            } catch (error) {
                console.error("Failed to fetch items:", error);
            }
        }
        fetchItems();
    }, []);


    //search items and filter them
    const displayItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter ==="all" || item.category === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <main>
            <h1>Browse Marketplace</h1>
            <p>Explore unique items from talented artisans</p>

            <section className="browse-filters">
                <input type="text" placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)}/>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All Categories</option>
                    <option value="Home Decor">Home Decor</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Art">Art</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Other">Other</option>
                </select>
            </section>
            <section className="browse-items">
                {displayItems.length === 0 && <p>No items found.</p>}
                {displayItems.map(item => (
                    <Link key={item.id} href={`/productDetails/${item.id}`} className="browse-item-link">
                        <div className="browse-item">
                            <div className="image-container">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="item-image"
                                    sizes="(max-width: 768px) 100vw, 300px"
                                />
                            </div>
                            <div className="product-details">
                                <h2 className="title">{item.name}</h2>
                                <p className="description">{item.description}</p>
                                <p className="price"><strong>${item.price}</strong></p>
                                <p className="category">Category: {item.category}</p>
                            </div>
                        </div>
                    </Link>
                ))}
                {displayItems.length === 0 && <p>No items found.</p>}
            </section>
        </main>
    );
}