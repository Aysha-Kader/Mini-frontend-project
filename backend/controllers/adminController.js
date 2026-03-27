import User from "../models/User.js";

//  Get all users
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

//  Approve user
export const approveUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  user.isApproved = true;
  await user.save();

  res.json({ message: "User approved" });
};