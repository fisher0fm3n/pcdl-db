const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const seriesSchema = new Schema({
  title:  {
    type: String,
    required: true
  },
  description:  {
    type: String,
    required: true
  },
  type:  {
    type: String,
    required: true
  },
  status:  {
    type: String,
    required: true
  },
  thumbnail:  {
    type: String,
    required: true
  },
  cover:  {
    type: String,
    required: true
  },
  author:  {
    type: String,
    required: true
  },
  captions:  {
    type: Array,
    required: true
  },
  categories:  {
    type: Array,
    required: true
  },
  seasons:  {
    type: Array,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Series', seriesSchema);
