// import { clerkClient } from "@clerk/express";

// export const protectAdmin = async (req, res, next) => {
//   try {
//     const { userId } = req.auth();
//     const user = await clerkClient.users.getUser(userId);

//     if (user.privateMetadata.role !== "admin") {
//       return res.json({ success: false, message: "Not Authorized" });
//     }
//     next();
//   } catch (error) {
//     return res.json({ success: false, message: "Not Authorized" });
//   }
// };

import jwt from "jsonwebtoken";

export const protectAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized" });
    }

    req.user = decoded; // { userId, role }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const protectUser = (req, res, next) => {
  console.log("protectUser called");
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token:", token);
    if (!token) {
      console.log("No token");
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
