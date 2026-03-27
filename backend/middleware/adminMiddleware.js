import User from "../models/User.js";

//Admin only access
const adminOnly = async (req, res, next) => {
  const user = await User.findById(req.user);

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  next();
};

export default adminOnly;