import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import TransactionList from './components/TransactionList';
import PortfolioShareList from './components/PortfolioShareList';
import TransactionForm from './components/TransactionForm';

function App() {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', padding: '20px 0' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Stock Portfolio Tracker
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {/* Left Half: PortfolioShareList and TransactionForm */}
        <Grid item xs={12} md={6}>
          <Box sx={{ marginBottom: '20px' }}>
            <PortfolioShareList />
          </Box>
          <Box>
            <TransactionForm />
          </Box>
        </Grid>

        {/* Right Half: TransactionList */}
        <Grid item xs={12} md={6}>
          <TransactionList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
