import jwt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  // console.log("Received token:", token);

  if (!token) {
    return res.status(401).json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ Error: "Token is invalid or expired" });
      } else {
        req.user = decoded;  
        next();
      }
    });
  }
};

export default verifyUser;
