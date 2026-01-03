import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    color: { type: String },
    size: { type: String },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    category: { type: String },
    brand: { type: String },
    images: [{ type: String }],
    variants: [variantSchema],
    ratings: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
