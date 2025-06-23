// server/models/ExcelData.js

const mongoose = require('mongoose');

const ExcelDataSchema = new mongoose.Schema(
  {
    data: { type: Array, required: true },
    uploadedBy: { type: String }, // Optionally track user
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ExcelData', ExcelDataSchema);
