const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const donationRoutes = require('./routes/donationRoutes');
const claimRoutes = require('./routes/claimRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/claims', claimRoutes);

module.exports = app;
