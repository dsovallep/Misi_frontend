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
			        {transaction.transaction_type} {transaction.quatity} shares_id of {transaction.share_id} at {transaction.price_per_share} per share in {transaction.portfolio_id} portfolio_id.
			    </li>
		    ))}
		</ul>
	    </div>
	);
};

export default TransactionList;
