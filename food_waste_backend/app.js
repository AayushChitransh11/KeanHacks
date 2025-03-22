const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // ✅ updated path
const userRoutes = require('./routes/userRoutes');
const donationRoutes = require('./routes/donationRoutes');
const claimRoutes = require('./routes/claimRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/claims', claimRoutes);

module.exports = app;
