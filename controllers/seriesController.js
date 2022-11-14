const Series = require('../models/seriesModel');
const mongoose = require('mongoose');

// Get all series
const getSeriesCollection = async (req, res) => {
  const seriesCollection = await Series.find({}).sort({createAt: -1});

  res.status(200).json(seriesCollection);
}

// Get single
const getSeries = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such series'})
  }

const series = await Series.findById(id);

if (!series) {
  return res.status(404).json({error: 'No such series'})
}

res.status(200).json(series);
}

//create
const createSeries = async (req, res) => {
  const {title, description, series, status, thumbnail, cover, author, captions, categories, seasons } = req.body;

//add doc to db
  try {
    const seriesInstance  = await Series.create({title, description, series, status, thumbnail, cover, author, captions, categories, seasons })
    res.status(200).json(seriesInstance)
  } catch(error) {
    res.status(400).json({error: error.message})
  }
}

//delete

const deleteSeries = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such series'})
  }

  const series = await Series.findOneAndDelete({_id: id})

  if (!series) {
    return res.status(400).json({error: 'No such series'})
  }

  res.status(200).json(series);

}

//update
const updateSeries = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such series'})
  }

  const series = await Series.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!series) {
    return res.status(400).json({error: 'No such series'})
  }

  res.status(200).json(series);
}



module.exports = {
  createSeries,
  getSeriesCollection,
  getSeries,
  deleteSeries,
  updateSeries
}
