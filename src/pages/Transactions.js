import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';

function Transactions() {
    return (
        <Container>
            <Box sx={{ textAlign: 'center', padding: '20px 0' }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Transactions
                </Typography>
            </Box>

            <Grid container spacing={2}>
                {/* Left Half: TransactionForm */}
                <Grid item xs={12} md={7}>
                    <TransactionList />
                </Grid>

                {/* Right Half: TransactionList */}
                <Grid item xs={12} md={5}>
                    <TransactionForm />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Transactions;
