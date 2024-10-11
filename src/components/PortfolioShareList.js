import React, { useState, useEffect } from 'react';
import { getPortfolioShare } from '../services/api_misi_back.js';

const PortfolioShareList = () => {
    const [portShares, setPortShares] = useState([]);

    const fetchPortfolioShare = async () => {
        try {
            const response = await getPortfolioShare();
            console.log('response.data', response.data)
            setPortShares(response.data);
        } catch (error) {
            console.error('Error fetching data from PortfolioShareList: ', error);
        }
    };

    useEffect(() => {
        fetchPortfolioShare();
    }, []);

    return (
        <div>
            <h2>Summary Investments</h2>
            <ul>
                {portShares.map((ps) => (
                    <li key={ps.id}>
                        <strong>share name:</strong> {ps.share_name} <br/> 
                        <strong>number share:</strong> {ps.number_share} <br/> 
                        <strong>amount:</strong> {ps.amount} <br/> 
                        <strong>average price per share:</strong> {ps.average_price_per_share} <br/> 
                        <strong>profit/loss:</strong> {ps.profit_loss} <br/> 
                        <strong>total in fees:</strong> {ps.total_in_fees} <br/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PortfolioShareList;

