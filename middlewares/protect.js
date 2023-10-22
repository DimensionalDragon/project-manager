const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET } = process.env;

async function protect(req, res, next) {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        req.user = jwt.verify(accessToken, JWT_ACCESS_SECRET);
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ status: 'error', message: 'Invalid Access Token' });
    }
}

module.exports = protect;
