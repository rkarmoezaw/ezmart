import User from "../models/user.model.js";
import { sendError } from "../utils/responseHandler.js";
import jwt from "jsonwebtoken";

export async function protect(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return sendError(res, "Not authorized, token missing", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = await User.findById(decoded._id).select("-password");

    if (!req.user) {
      return sendError(res, "User no longer exists", 401);
    }
    next();
  } catch (error) {
    sendError(res, "Not authorized, token invalid", 401);
  }
}
