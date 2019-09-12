const mongoose = require('mongoose');

const kvittoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
    timestamps: true
  });

const Kvitto = mongoose.model('Kvitto', kvittoSchema)

module.exports = Kvitto;

