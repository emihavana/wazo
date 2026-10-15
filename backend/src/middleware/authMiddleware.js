import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({"message": "Access denied. No token provided."});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({"message": "Invalid token."});
        }
        req.userid = decoded.id;
        next();
    });
}
export default authMiddleware;