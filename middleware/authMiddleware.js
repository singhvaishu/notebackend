// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const authMiddleware = async (req, res, next) => {
//     const token = req.header('Authorization');

//     console.log('Received Token:', token); // Debug log

//     if (!token) return res.status(401).json({ message: 'Access denied' });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findById(decoded.id);
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };

// module.exports = authMiddleware;


const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    let token = req.header('Authorization');

    console.log('Received Token:', token); // Debug log

    // Check if token is present
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    // Remove the 'Bearer ' part if present
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trim(); // Remove 'Bearer ' prefix
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find the user based on the decoded token's ID
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Proceed to the next middleware/route
        next();
    } catch (error) {
        console.error('Token verification error:', error.message); // Debug log
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
