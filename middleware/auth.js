const jwt = require("jsonwebtoken");

// JWT token send through httponly cookie
const authSession = (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (cookies.plopplop) {
      const verified = jwt.verify(cookies.plopplop, process.env.JWT_SECRET);
      if (!verified) {
        return res
          .status(401)
          .json({ msg: "Token verification failed, authorization denied." });
      }
      req.userId = verified.id;
      next();
      return;
    }
    return res
      .status(401)
      .json({ msg: "No authentication token, authorization denied." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// JWT token, front-end need to store in localstorage
const auth = (req, res, next) => {
  try {
    const authHeader = req.header("authorization");
    if (!authHeader) {
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });
    }

    const segments = authHeader.split(" ");

    if (segments.length != 2) {
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });
    }

    const token = segments[1];
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });
    }
    req.userId = verified.id;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { auth, authSession };
