const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

exports.register = async(req, res)=> {
    const { username, password } = req.body;

    // Generate a random salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await Admin.create(username, hashedPassword, salt);

    if (result.success) {
        res.status(200).json({ message: 'Registration successful' });
    } else {
        res.status(500).json({ error: result.error });
    }
}

exports.login =async(req, res)=> {
    const { username, password } = req.body;
    const admin = await Admin.getByUsername(username);

    if (admin && await bcrypt.compare(password, admin.password)) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}

