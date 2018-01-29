import React, { Component } from 'react';
import axios from 'axios';

class Product extends Component{

  deleteHandler = () => { axios.delete('http://localhost:3001/api/v1/amazon_products/' + this.props.amazonProduct.id)
    .then(response => {
      this.props.deleteAmazonProducts(this.props.amazonProduct)
    })
    .catch(error => console.log(error))
  }

  render () {
    return (
      <li>
        <h4>{this.props.amazonProduct.asin}</h4>
        <p>{this.props.amazonProduct.number_of_reviews} reviews</p>
        <p>{this.props.amazonProduct.average_rating} average rating</p>
        <p>{this.props.amazonProduct.dimensions} in size</p>
        <button onClick={this.deleteHandler} >remove</button>
      </li>
    )
  }
}

export default Product
