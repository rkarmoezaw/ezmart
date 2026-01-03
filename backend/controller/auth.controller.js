import { sendSuccess, sendError } from "../utils/responseHandler.js";
import User from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return sendError(res, "Please fill all the fields", 400);
    }

    if (password.length < 6) {
      return sendError(res, "Password must be at least 6 characters", 400);
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendError(res, "User already exists", 409);
    }

    const user = await User.create({ name, email, password });
    sendSuccess(
      res,
      {
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateAccessToken(user._id),
      },
      "User created successfully",
      201
    );
  } catch (error) {
    sendError(res, "Internal server error");
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return sendError(res, "Please fill all the fields", 400);
    }

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      user.refreshTokens.push(refreshToken);
      await user.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return sendSuccess(
        res,
        {
          name: user.name,
          email: user.email,
          role: user.role,
          accessToken,
        },
        "User logged in successfully",
        200
      );
    } else {
      return sendError(res, "Invalid credentials", 401);
    }
  } catch (error) {
    sendError(res, "Internal server error");
  }
}

export async function profile(req, res) {
  try {
    const user = req.user;

    if (!user) {
      return sendError(res, "User not found", 404);
    }
    sendSuccess(
      res,
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        createdAt: user.createdAt,
      },
      "Profile fetched successfully"
    );
  } catch (error) {
    sendError(res, "Internal server error");
  }
}

export async function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return sendError(res, "Unauthorized: No token provided", 401);
  }

  try {
    const user = await User.findOne({ refreshTokens: refreshToken });

    if (!user) {
      return sendError(res, "Unauthorized: Invalid session", 401);
    }

    await jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    user.refreshTokens = user.refreshTokens.filter((t) => t !== refreshToken);

    const newRefreshToken = generateRefreshToken(user._id);
    const newAccessToken = generateAccessToken(user._id);

    user.refreshTokens.push(newRefreshToken);
    await user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendSuccess(res, { accessToken: newAccessToken }, "Access token refreshed");
  } catch (error) {
    console.error("Refresh Token Error:", error.message);
    sendError(res, "Session expired or invalid token", 403);
  }
}

export async function logout(req, res) {
  const token = req.cookies.refreshToken;
  const user = await User.findOne({ refreshTokens: token });

  if (user) {
    user.refreshTokens = user.refreshTokens.filter((t) => t !== token);
    await user.save();
  }

  res.clearCookie("refreshToken");
  sendSuccess(res, null, "Logged out successfully", 204);
}
