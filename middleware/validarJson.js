export const validateJsonSize = (req, res, next) => {
  console.log(req.headers["content-length"] + " bytes");
  if (req.body && JSON.stringify(req.body).length > 100) {
    return res
      .status(413)
      .json({ error: "El JSON excede el tamaño permitido" });
  }
  next();
};
