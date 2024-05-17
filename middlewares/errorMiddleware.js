export const notFound = (req, res, next) => {
  const error = new Error("Not Found");
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500; // Correction: use res.statusCode
  const message = err.message || "Internal Server Error";

  res.status(statusCode).send(message);
};
