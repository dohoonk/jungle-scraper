import React, { Component } from 'react';
import './App.css';
import ProductListContainer from './components/ProductListContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Jungle Scraper</h1>
        </header>
        <div className="main">
          <ProductListContainer />
        </div>
      </div>
    );
  }
}

export default App;
