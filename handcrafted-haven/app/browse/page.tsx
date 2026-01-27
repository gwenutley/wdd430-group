"use client";

import { useState, useEffect } from "react";

type Item = {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
};

export default function BrowsePage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [items, setItems] = useState<Item[]>([]);

    const sampleItems: Item[] = [
        {id: 1, name: "Handmade Vase", description: "A beautiful handmade vase.", category: "Home Decor", price: 45.00},
        {id: 2, name: "Silver Necklace", description: "Elegant silver necklace.", category: "Jewelry", price: 75.00},
        {id: 3, name: "Landscape Painting", description: "Acrylic landscape painting.", category: "Art", price: 120.00},
        {id: 4, name: "Knitted Scarf", description: "Warm and cozy scarf.", category: "Clothing", price: 30.00},
        {id: 5, name: "Wooden Bowl", description: "Hand-carved wooden bowl.", category: "Home Decor", price: 60.00},
    ]

    useEffect(() => {
        const randomItems = sampleItems.sort(() => Math.random() - 0.5);
        setItems(randomItems);
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
                {displayItems.map(item => (
                    <div key={item.id} className="browse-item">
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p><strong>${item.price}</strong></p>
                        <p className="category">{item.category}</p>
                    </div>
                ))}
                {displayItems.length === 0 && <p>No items found.</p>}
            </section>
        </main>
    );
}