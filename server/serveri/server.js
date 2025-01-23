const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: [ "https://nalsak.biz.tr", "https://devapi.nalsak.biz.tr/"],
  // origin: ["http://localhost:5173"],
  credentials: true,
}));
app.use(cookieParser());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log('MongoDB connected successfully via Mongoose');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

app.use('/auth', authRoutes);
app.use('/items', itemRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});