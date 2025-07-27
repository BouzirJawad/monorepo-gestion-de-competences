const { verifyToken } = require("../config/jwt");
const axios = require("axios");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = verifyToken(token);
    const userRes = await axios.get(
      `${process.env.AUTH_URL}/api/users/user/${decoded.userId}`
    );
    const user = userRes.data;
    if (!user) {
      return res.status(401).json({ message: "User not found! Token invalid" });
    }

    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: error.message || "Error, Token is not valid" });
  }
};

module.exports = authMiddleware;
