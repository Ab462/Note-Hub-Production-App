import jwt from "jsonwebtoken";

export default function fetchUser(req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ message: 'Please authenticate using a valid token' });
    }
    try {
        const VerifyToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = VerifyToken.userId;

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized, please authenticate using a valid token',
            error: error.message
        });
    }
}
