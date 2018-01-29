import React, { Component } from 'react';
import axios from 'axios';
import Product from './Product';
import update from 'immutability-helper';
import SearchBar from './SearchBar'

class ProductListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amazonProducts: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/amazon_products')
    .then(response => {
      this.setState({amazonProducts: response.data})
    })
    .catch(error => console.log(error))
  }

  updateAmazonProducts = (product) => {
    const amazonProducts = update(this.state.amazonProducts, {$splice:[[0,0,product]]})
    this.setState({amazonProducts: amazonProducts})
  }

  deleteAmazonProduct = (product) => {
    const amazonProductIndex = this.state.amazonProducts.findIndex(x => x.id === product.id)
    const amazonProducts = update(this.state.amazonProducts, {$splice:[[amazonProductIndex, 1]]})
    this.setState({amazonProducts: amazonProducts})
  }

  render() {
    return (
      <div>
        <SearchBar updateAmazonProducts={this.updateAmazonProducts}/>
        <ul>
          {this.state.amazonProducts.map((amazonProduct) =>{
            return (
              <Product amazonProduct={amazonProduct} key={amazonProduct.id}  deleteAmazonProducts={this.deleteAmazonProduct}/>
            )
          })}
        </ul>
      </div>
    )
  }
}


export default ProductListContainer;
