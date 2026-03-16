import User from "../models/User.js";


// ADD FAVOURITE
export const addFavourite = async (req, res) => {

  const user = await User.findById(req.user);

  if (!user.favourites.includes.map(fav=> fav.toString()).includes(req.params.id)) {
    user.favourites.push(req.params.id);
  }

  await user.save();

  res.json(user.favourites);

};


// REMOVE FAVOURITE
export const removeFavourite = async (req, res) => {

  const user = await User.findById(req.user);

  user.favourites = user.favourites.filter(
    fav => fav.toString() !== req.params.id
  );

  await user.save();

  res.json(user.favourites);

};


// GET FAVOURITES
export const getFavourites = async (req, res) => {

  const user = await User
    .findById(req.user)
    .populate("favourites");

  res.json(user.favourites);

};