import React, { Component } from 'react';
import update from 'immutability-helper';
import axios from 'axios';

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      asin: ""
    }
  }

  handleInput = (e) => {
    this.setState({asin: e.target.value})
  }

  newProductSubmitHandler = e => {
    e.preventDefault();
    const product = {asin: this.state.asin}
    axios.post('http://localhost:3001/api/v1/amazon_products',{search: {search: product}})
    .then(response => {
      this.props.updateAmazonProducts(response.data)
    })
    .catch(error => console.log(error))
  }


  render() {
    return (
      <form onSubmit={this.newProductSubmitHandler}>
          <input type="text" placeholder="Type ASIN" value={this.state.asin} onChange={this.handleInput.bind(this)} />
          <button type="submit" name="submit" value="submit">Submit</button>
      </form>
    )
  }
}

export default SearchBar
