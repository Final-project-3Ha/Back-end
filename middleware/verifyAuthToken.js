import jwt from "jsonwebtoken";

const verifyIsLoggedIn = (req, res, next) => {
  next();
  return; // to do remove later

  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).send("Unauthorized. Invalid token");
    }
  } catch (err) {
    next(err);
  }
};

// Verify Is Admin

const verifyIsAdmin = (req, res, next) => {
  next();
  return; // to do remove later

  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).send("Unauthorized. Admin required");
  }
};

export { verifyIsLoggedIn, verifyIsAdmin };
