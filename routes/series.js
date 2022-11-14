const express = require('express');

const { createSeries, getSeriesCollection,
getSeries, deleteSeries, updateSeries } = require('../controllers/seriesController')
const router = express.Router();

//POST
router.post('/create', createSeries);

//GET
router.get('/', getSeriesCollection);

router.get('/:id', getSeries);

//DELETE
router.delete('/:id', deleteSeries);

//PATCH
router.patch('/:id', updateSeries);


module.exports = router
