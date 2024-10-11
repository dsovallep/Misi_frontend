import React, { useEffect, useState } from "react";
import { getTransactions } from "../services/api_misi_back.js";

const TransactionList = () => {
        const [transaction, setTransactions] = useState([]);

	useEffect(() => {
		fetchTransactions();             
	}, []);

	const fetchTransactions = async() => {
		try {
			const response = await getTransactions();
			setTransactions(response.data);
		} catch (error) {
                       console.error("Error fetching transaction", error);
		}
	};

	return(
            <div>
		<h2>Transaction</h2>
                <ul>
                    {transaction.map((transaction) => (
			    <li key={transaction.id}>
			        <strong> Share id </strong> {transaction.share_id}
			        <strong> Type transaction </strong> {transaction.transaction_type}
			        <strong> Number of shares </strong> {transaction.quantity} 
			        <strong> Price per share </strong> {transaction.max_price_per_share}
			        <strong> Total shares price </strong> {transaction.total_shares_price}
			    </li>
		    ))}
		</ul>
	    </div>
	);
};

export default TransactionList;
