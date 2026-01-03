export function sendSuccess(
  res,
  result = null,
  message = "Request successful",
  status = 200
) {
  return res.status(status).json({
    success: true,
    message,
    result,
  });
}

export function sendError(res, message, statusCode = 500) {
  return res.status(statusCode).json({
    success: false,
    message,
  });
}
