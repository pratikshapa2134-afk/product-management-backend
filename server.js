const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: "*", // Sagle origins allow karel tyamule CORS cha error khedi yenar nahi
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

// Routes Import (Tumchya file structure nusar route check kara)
// Udaharanarth jar auth routes astil tar:
// const authRoutes = require('./routes/authRoutes');
// app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running successfully...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});