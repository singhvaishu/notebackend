const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    try {

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'Email already registered',
                redirectToLogin: true
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Failed to register user. Please try again later.' });
    }
};

// Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid)
        // Generate token regardless of password validity
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Token validity: 1 day
        );

        if (!isPasswordValid) {

            return res.status(200).json({ message: 'Invalid credentials. Please try again with the correct password.' });
        }

        res.status(200).json({ token, userId: user._id, message: 'Login successful' });

    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
};
