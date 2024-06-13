
import React, { useState, useEffect } from 'react';
import "../styles/home.css";

function Home() {
  const [stocks, setStocks] = useState([]);
  const [stockName, setStockName] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [stockPrice, setStockPrice] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/stocks')
      .then(response => response.json())
      .then(data => setStocks(data))
      .catch(error => console.error('Error fetching stocks:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stockName && stockQuantity && stockPrice) {
      const totalPrice = parseFloat(stockQuantity) * parseFloat(stockPrice);
      const newStock = {
        name: stockName,
        quantity: stockQuantity,
        price: stockPrice,
        totalPrice: totalPrice.toFixed(2),
      };
      if (editIndex !== null) {
        fetch(`http://localhost:3000/stocks/${stocks[editIndex].id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newStock),
        })
          .then(response => response.json())
          .then(updatedStock => {
            const updatedStocks = [...stocks];
            updatedStocks[editIndex] = updatedStock;
            setStocks(updatedStocks);
            setEditIndex(null);
          })
          .catch(error => console.error('Error updating stock:', error));
      } else {
        fetch('http://localhost:3000/stocks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newStock),
        })
          .then(response => response.json())
          .then(addedStock => setStocks([...stocks, addedStock]))
          .catch(error => console.error('Error adding stock:', error));
      }
      setStockName('');
      setStockQuantity('');
      setStockPrice('');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleEdit = (index) => {
    const stock = stocks[index];
    setStockName(stock.name);
    setStockQuantity(stock.quantity);
    setStockPrice(stock.price);
    setEditIndex(index);
  };

  const handleDelete = (id, index) => {
    fetch(`http://localhost:3000/stocks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedStocks = [...stocks];
        updatedStocks.splice(index, 1);
        setStocks(updatedStocks);
      })
      .catch(error => console.error('Error deleting stock:', error));
  };

  return (
    <div className="container">
      <h1>Stock Portfolio Tracker 📦</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
          placeholder="Stock Name"
        />
        <input
          type="number"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          placeholder="Quantity"
        />
        <input
          type="number"
          value={stockPrice}
          onChange={(e) => setStockPrice(e.target.value)}
          placeholder="Price"
        />
        <button type="submit">{editIndex !== null ? 'Edit Stock' : 'Add Stock'}</button>
      </form>
      <ul>
        {stocks.map((stock, index) => (
          <li key={index}>
            <strong>{stock.name}</strong> - Quantity: {stock.quantity}, Price: ₹{stock.price}, Total: ₹{stock.totalPrice}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(stock.id, index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;












