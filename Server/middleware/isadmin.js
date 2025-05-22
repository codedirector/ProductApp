const jwt=require("jsonwebtoken");

function isAdmin(req,res,next){
     const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Token required");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role.toLowerCase() !== "admin") {
      return res.status(403).send("Only admin can do this");
    }
    req.user = decoded;
    next();
  } catch {
    console.error("JWT error:", err.message);
    return res.status(401).send("Invalid token");
  }
}

module.exports=isAdmin;
