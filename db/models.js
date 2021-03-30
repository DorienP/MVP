const mongoose = require('mongoose');

const comparisonSchema = new mongoose.Schema({
  ada: Number,
  bitcoin: Number,
  eth: Number,
  date: {type: Date, default: Date.now}
});
