const jwt = require("jsonwebtoken");
const redisclient = require("../services/redis");

async function authorization(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const data = await redisclient.get(token); // ✅ Proper promise-based call
    if (data) {
      console.log("hello");
      return res.status(401).json({ message: "Unauthorized: Logged out token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);

    return next(); // ✅ Only call next() if no response was sent

  } catch (err) {
    console.error("Auth error:", err);
    if (!res.headersSent) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
}

module.exports = authorization;
