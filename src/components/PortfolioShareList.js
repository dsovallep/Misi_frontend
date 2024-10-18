import React, { useState, useEffect } from 'react';
import { getPortfolioShare } from '../services/api_misi_back.js';
import { Card, CardContent, Typography, List, ListItem, Divider, TextField } from '@mui/material';


const PortfolioShareList = () => {
    const [portShares, setPortShares] = useState([]);
    const [currentPrices, setCurrentPrices] = useState({});

    const fetchPortfolioShare = async () => {
        try {
            const response = await getPortfolioShare();
            setPortShares(response.data);
        } catch (error) {
            console.error('Error fetching data from PortfolioShareList: ', error);
        }
    };

    useEffect(() => {
        fetchPortfolioShare();
    }, []);

    // Handling the change in the current price value 
    const handlePriceChange = (id, value) => {
        setCurrentPrices({
            ...currentPrices,
	    [id]: parseFloat(value) || 0,
	});
    };
    
    const calculateProfitability = (averagePrice, numberShare, currentPrice) => {
        return (currentPrice - averagePrice) * numberShare;    
    };

    const formattedNumber = (number) => {
        return Number(number).toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
	});
    }

    return (
        <Card>
	    <CardContent>
	        <Typography variant='h5' gutterBottom>
	            Summary Investments
	        </Typography>
                <List>
                    {portShares.map((ps) => (
		    	<React.Fragment key={ps.id}>
                            <ListItem>
			        <Typography variant="body1">
                                    <strong>share name:</strong> {ps.share_name} <br/> 
                                    <strong>number share:</strong> {formattedNumber(ps.number_share)} <br/> 
                                    <strong>amount:</strong> {formattedNumber(ps.amount)} <br/> 
                                    <strong>average price per share:</strong> {formattedNumber(ps.average_price_per_share)} <br/> 
                                    <strong>profit/loss:</strong> {formattedNumber(ps.profit_loss)} <br/> 
                                    <strong>total in fees:</strong> {formattedNumber(ps.total_in_fees)} <br/>
			            
			            <TextField
			                label="Current Price"
			                variant="outlined"
			                size="small"
			                type="number"
			                value={currentPrices[ps.id] || ''} // Display the current valur or empty if none has
                                        onChange={(e) => handlePriceChange(ps.id, e.target.value)}
			                style={{ marginTop: '10px' }}
			            />
			            
			            <Typography variant="body2" color="primary" style={{ marginTop: '10px' }}>
			                <strong>Calculated profitability:</strong> {
                                            currentPrices[ps.id]
						? formattedNumber(calculateProfitability(ps.average_price_per_share, ps.number_share, currentPrices[ps.id]))
						: 'Enter current price to calculate'
					}
			            </Typography>
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

export default PortfolioShareList;

