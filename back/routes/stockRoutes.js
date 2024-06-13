const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/stocks', stockController.getStocks);
router.post('/stocks', stockController.addStock);
router.put('/stocks/:id', stockController.updateStock);
router.delete('/stocks/:id', stockController.deleteStock);

module.exports = router;
