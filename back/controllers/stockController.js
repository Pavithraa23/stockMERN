const Stock = require('../models/stockModel');

// Get all stocks
const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stocks', error });
  }
};

// Add a new stock
const addStock = async (req, res) => {
  const { name, quantity, price } = req.body;
  const totalPrice = (quantity * price).toFixed(2);
  const newStock = new Stock({ name, quantity, price, totalPrice });

  try {
    const savedStock = await newStock.save();
    res.json(savedStock);
  } catch (error) {
    res.status(500).json({ message: 'Error adding stock', error });
  }
};

// Update an existing stock
const updateStock = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price } = req.body;
  const totalPrice = (quantity * price).toFixed(2);

  try {
    const updatedStock = await Stock.findByIdAndUpdate(id, { name, quantity, price, totalPrice }, { new: true });
    if (updatedStock) {
      res.json(updatedStock);
    } else {
      res.status(404).json({ message: 'Stock not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating stock', error });
  }
};

// Delete a stock
const deleteStock = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStock = await Stock.findByIdAndDelete(id);
    if (deletedStock) {
      res.json({ message: 'Stock deleted' });
    } else {
      res.status(404).json({ message: 'Stock not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting stock', error });
  }
};

module.exports = {
  getStocks,
  addStock,
  updateStock,
  deleteStock,
};
