import User from "../models/User.js";


// ADD FAVOURITE
export const addFavorite = async (req, res) => {

  const user = await User.findById(req.user);

  if (!user.favorites.map(fav=> fav.toString()).includes(req.params.id)) {
    user.favorites.push(req.params.id);
  }

  await user.save();

  res.json(user.favorites);

};


// REMOVE FAVOURITE
export const removeFavorite = async (req, res) => {

  const user = await User.findById(req.user);

  user.favorites = user.favorites.filter(
    fav => fav.toString() !== req.params.id
  );

  await user.save();

  res.json(user.favorites);

};


// GET FAVOURITES
export const getFavorites = async (req, res) => {

  const user = await User
    .findById(req.user)
    .populate("favorites");

  res.json(user.favorites);

};