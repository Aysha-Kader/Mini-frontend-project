import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;

  //  Check for Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //  Extract token
      token = req.headers.authorization.split(" ")[1];

      //  Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      

      //  Attach user id
      req.user = decoded.id;

      return next(); //
    } catch (error) {
      console.log("JWT ERROR:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  //  No token
  return res.status(401).json({ message: "Not authorized, no token" });
};

export default protect;