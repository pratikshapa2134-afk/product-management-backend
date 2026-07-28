const router = require('express').Router();
const bcrypt = require('bcryptjs');

// Temporary local array (Database shivay data save karnyasathi)
const users = [];

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });
        
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username);
        if (!user) return res.status(400).json({ message: "User not found!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

        res.json({ message: "Login successful", username: user.username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;