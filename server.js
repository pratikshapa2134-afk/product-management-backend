const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Root Route for Health Check
app.get('/', (req, res) => {
    res.send('🚀 MERN Backend is Running Live!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});