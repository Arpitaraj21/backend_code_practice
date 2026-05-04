// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   // const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];  console.log("token", token);

//   if (!token) {
//     return res.status(401).json({
//       message: "Unauthorized!",
//       success: false,
//     });
//   }
//   try {
//     const decodedToken = jwt.verify(token, process.env.SECRETKEY);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     console.log("error", error);
//     return res.status(500).json({
//       message: "Internal server error!",
//       success: false,
//     });
//   }
// };



import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY);

    req.user = decoded;
    next();
  } catch (error) {
    console.log("error", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};