const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: "https://product-management-frontend-xxxx.vercel.app](https://product-management-frontend-xxxx.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.log('MongoDB Connection Error: ', err));

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Tumchya auth file chya folder structure pramane yethle path check karun gya 
// (Jar auth file routes folder madhech auth.js navane asel, tar './routes/auth' vapra)
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Root Route for Health Check
app.get('/', (req, res) => {
    res.send('MERN Backend is Running Live!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});