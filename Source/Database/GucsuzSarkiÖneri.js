const mongoose = require('mongoose');

const SarkiData = mongoose.Schema({
  Sarki: String,
  Dakika: String,
  YuklemeTarih: String
})

module.exports = mongoose.model("SarkiData", SarkiData)