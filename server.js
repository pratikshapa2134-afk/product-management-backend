const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB Connected Successfully'))
.catch((err) => console.log('MongoDB Connection Error: ', err));

// Routes Import
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running successfully...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});