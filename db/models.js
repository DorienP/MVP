const mongoose = require('mongoose');

const comparisonSchema = new mongoose.Schema({
  Coin: String,
  Price: Number,
});
