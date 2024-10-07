import React from 'react';
import PortfolioList from './components/PortfolioList.js';
import ShareList from './components/ShareList.js';
import TransactionList from './components/TransactionList.js';
import TransactionForm from './components/TransactionForm.js';

function App() {
  return (
    <div className="App">
      <header>
	  <h1>Stock Portfolio Tracker</h1>
      </header>
    
      <main>
        <section>
	    <PortfolioList />
	</section>

	<section>
          <ShareList />
        </section>

        <section>
          <TransactionList />
        </section>

        <section>
          <TransactionForm />
        </section>
      </main>
    </div>
  );
}

export default App;
