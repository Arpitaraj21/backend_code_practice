import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookie.accessToken;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
      sucess: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Access token expired",
      success: false,
    });
  }
};
