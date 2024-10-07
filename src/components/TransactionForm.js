import React, { useState, useEffect } from "react";
import { createTransaction, getPortfolios, getShares } from "../services/api_misi_back.js";

const TransactionForm = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [shares, setShares] = useState([]);
  const [transactionData, setTransactionData] = useState({
    portfolio_id: "",
    share_id: "",
    transaction_type: "BUY",
    quatity: "",
    price_per_share: "",
    fees: "",
    notes: "",
  });

  useEffect(() => {
    fetchPortfolios();
    fetchShares();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await getPortfolios();
      setPortfolios(response.data);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };

  const fetchShares = async () => {
    try {
      const response = await getShares();
      setShares(response.data);
    } catch (error) {
      console.error("Error fetching shares:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransactionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createTransaction(transactionData);
      alert("Transaction created successfully!");
      // Optionally reset the form
      setTransactionData({
        portfolio_id: "",
        share_id: "",
        transaction_type: "BUY",
        quatity: "",
        price_per_share: "",
        fees: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("Failed to create transaction.");
    }
  };

  return (
    <div>
      <h2>Create a Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Portfolio:</label>
          <select
            name="portfolio_id"
            value={transactionData.portfolio_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Portfolio</option>
            {portfolios.map((portfolio) => (
              <option key={portfolio.id} value={portfolio.id}>
                {portfolio.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Share:</label>
          <select
            name="share_id"
            value={transactionData.share_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Share</option>
            {shares.map((share) => (
              <option key={share.id} value={share.id}>
                {share.name} ({share.symbol})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Transaction Type:</label>
          <select
            name="transaction_type"
            value={transactionData.transaction_type}
            onChange={handleChange}
          >
            <option value="BUY">Buy</option>
            <option value="SELL">Sell</option>
	  </select>
        </div>

        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quatity"
            value={transactionData.quatity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price per Share:</label>
          <input
            type="number"
            step="0.01"
            name="price_per_share"
            value={transactionData.price_per_share}
            onChange={handleChange}
            required
          />
        </div>
        
	<div>
          <label>Total share price:</label>
	  <input
	    type="number"
	    step="0.01"
	    name="total_share_price"
	    value={transactionData.total_share_price}
	    onChange={handleChange}
	    required
	  />
	</div>
        
	<div>
          <label>Fees:</label>
          <input
            type="number"
            step="0.01"
            name="fees"
            value={transactionData.fees}
            onChange={handleChange}
            required
          />
        </div>
        
	<div>
          <label>Total Transaction</label>
          <input
            type="number"
            step="0.01"
            name="total_transaction"
            value={transactionData.total_transaction}
            onChange={handleChange}
            required
          />
        </div>

	<div>
          <label>Transaction Date:</label>
	  <input
	    type="date"
	    name="transaction_date"
	    value={transactionData.transaction_date}
	    onChange={handleChange}
	    required
	  />
	</div>
     
	<div>
          <label>Order Number:</label>
          <input
            type="text"
            name="orden_number"
            value={transactionData.orden_number}
            onChange={handleChange}
            required
          />
        </div>
	<div>
          <label>Notes:</label>
          <textarea
            name="notes"
            value={transactionData.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;
