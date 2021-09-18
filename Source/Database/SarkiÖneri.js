const mongoose = require('mongoose');

const SarkiData = mongoose.Schema({
  Sarki: String,
  Sanatci: String,
  YuklemeTarih: String,
  AlbumAdi: String,
  Links: Array
})

module.exports = mongoose.model("SarkiData", SarkiData)