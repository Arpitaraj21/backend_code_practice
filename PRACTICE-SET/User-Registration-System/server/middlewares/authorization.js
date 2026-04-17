import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized!",
      success: false,
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRETKEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};
