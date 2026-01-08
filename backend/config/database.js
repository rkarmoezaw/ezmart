import mongoose from "mongoose";

import Product from "../models/product.model.js";

//Sample Products
const sampleProducts = [
  {
    name: "Nebula Pro Headphones",
    description:
      "Noise-canceling over-ear headphones with 40-hour battery life and spatial audio. Professional grade sound for enthusiasts.",
    price: 299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    rating: 4.8,
    stock: 15,
  },
  {
    name: "Zenith Smart Watch",
    description:
      "Track your health, receive notifications, and stay connected with this sleek smartwatch featuring an AMOLED display.",
    price: 199.5,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    rating: 4.6,
    stock: 22,
  },
  {
    name: "Lumina Ergo Chair",
    description:
      "Ergonomic office chair designed for maximum comfort during long working sessions with breathable mesh.",
    price: 450.0,
    category: "Home Office",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800",
    rating: 4.9,
    stock: 8,
  },
  {
    name: "Minimalist Walnut Desk",
    description:
      "Solid walnut desk with integrated cable management and a modern silhouette. Perfect for clean setups.",
    price: 899.0,
    category: "Home Office",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800",
    rating: 4.7,
    stock: 5,
  },
  {
    name: "Titan Gaming Mouse",
    description:
      "Ultra-lightweight gaming mouse with customizable DPI and RGB lighting for precision control.",
    price: 79.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800",
    rating: 4.5,
    stock: 45,
  },
  {
    name: "Oasis Smart Planter",
    description:
      "Self-watering planter with integrated growth lighting controlled by your phone. Grow herbs anywhere.",
    price: 125.0,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800",
    rating: 4.8,
    stock: 12,
  },
  {
    name: "Aura Table Lamp",
    description:
      "Atmospheric LED lamp with touch control and wireless charging base for your smartphone.",
    price: 85.0,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
    rating: 4.6,
    stock: 25,
  },
  {
    name: "Sonic Soundbar",
    description:
      "Compact soundbar with deep bass and crystal clear dialogue for your home theater setup.",
    price: 159.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800",
    rating: 4.4,
    stock: 18,
  },
];

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB is connected...");

    const count = await Product.countDocuments();
    if (count === 0) {
      console.log("Database is empty. Seeding products...");
      await Product.insertMany(sampleProducts);
      console.log("Seeding complete.");
    } else {
      console.log("Database is not empty. Skipping seeding.");
    }
  } catch (error) {
    console.error("MongoDB Atlas connection is failed");
    console.log(error);
    process.exit(1);
  }
}
