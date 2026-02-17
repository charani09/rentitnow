const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rentalRoutes = require('./routes/rentalRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/rentals', rentalRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('RentItNow API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
