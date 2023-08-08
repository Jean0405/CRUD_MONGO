import rateLimit from "express-rate-limit";

export const limitRequests = () => {
  return rateLimit({
    windowMs: 30 * 1000, // 30 segundos
    max: 5, // Limit each IP to 5 requests per `window` (here, per 30 seg)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
      status: 429,
      message: "Superaste el limite de solicitudes",
    },
  });
};
