import { sendSuccess, sendError } from "../utils/responseHandler.js";
import Product from "../models/product.model.js";

//GetAllProducts
export async function getAllProducts(req, res) {
  const products = await Product.find();
  try {
    sendSuccess(res, products, "Products fetched successfully", 200);
  } catch (error) {
    sendError(res, "Internal server error");
  }
}

//GetProductById
export async function getProductById(req, res) {
  const { id } = req.params;
  try {
    if (!id) return sendError(res, "Product not found", 404);
    const product = await Product.findById(id);
    sendSuccess(res, product, "Product fetched successfully", 200);
  } catch (error) {
    sendError(res, "Internal server error");
  }
}

//CreateProduct
export async function createProduct(req, res) {
  const { name, description, price, image } = req.body;
  try {
    if (!name || !description || !price || !image) {
      return sendError(res, "Please fill all the fields", 400);
    }
    const product = await Product.create({
      name,
      price,
      category,
      description,
      image,
      rating: rating || 0,
      stock: stock || 0,
    });
    sendSuccess(res, product, "Product created successfully", 201);
  } catch (error) {
    sendError(res, "Internal server error");
  }
}

//DeleteProduct
export async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    if (!id) return sendError(res, "Product not found", 404);
    Product.findByIdAndDelete(id, (err) => {
      if (err) return sendError(res, "Internal server error");
      sendSuccess(res, null, "Product deleted successfully", 204);
    });
  } catch (error) {
    sendError(res, "Internal server error");
  }
}
