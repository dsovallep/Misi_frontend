import React, { useEffect, useState } from "react";
import { getTransactions } from "../services/api_misi_back";
import { Card, CardContent, Typography, List, ListItem, Divider } from "@mui/material";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions();
      // Reverse the transactions array to show the most recent transaction first
      setTransactions(response.data.reverse());
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Transactions
        </Typography>
        <List>
          {transactions.map((transaction) => (
            <React.Fragment key={transaction.id}>
              <ListItem>
                <Typography variant="body1">
                  <strong>Share ID:</strong> {transaction.share_id} <br />
                  <strong>Type:</strong> {transaction.transaction_type} <br />
                  <strong>Quantity:</strong> {transaction.quantity} <br />
                  <strong>Price per Share:</strong> {transaction.max_price_per_share} <br />
                  <strong>Total Price:</strong> {transaction.total_shares_price}
                </Typography>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
