import { sendSuccess, sendError } from "../utils/responseHandler.js";
import Order from "../models/order.model.js";

//CreateOrders
export async function createOrders(req, res) {
  const { items, total } = req.body;
  try {
    const order = await Order.create({
      userId: req.user.id,
      items,
      total,
      status: "Processing",
    });
    sendSuccess(res, order, "Order created successfully", 201);
  } catch (error) {
    sendError(res, "Internal server error");
  }
}

//GetUserOrders
export async function getUserOrders(req, res) {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ date: -1 });

    sendSuccess(res, orders, "Orders fetched successfully", 200);
  } catch (error) {
    sendError(res, "Internal server error");
  }
}
