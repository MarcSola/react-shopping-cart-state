// eslint-disable-next-line
import React, { Component } from "react";

import Home from "./pages/Home";

import * as api from "./api";
// import products from "./utils/demo-data";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      cartItems: [],
      isLoading: false,
      hasError: false,
      loadingError: null,
    };

    /* Binding methods */
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    api.getProducts().then((data) => {
      this.setState({
        products: data,
        isLoading: false,
      });
    });
  }

  handleAddToCart(productId) {
    const { products, cartItems } = this.state;
    // Getting cartItem
    const item = cartItems.find((cartItem) => cartItem.id === productId);
    if (item) {
      item.quantity += 1;
    } else {
      const newCartItem = products.find((product) => product.id === productId);
      newCartItem.quantity = 1;
      cartItems.push(newCartItem);
    }
    this.setState({
      cartItems: cartItems,
    });
  }

  // handleChange(event, productId) {}

  handleRemove(productId) {
    const { cartItems } = this.state;
    // Gathering new cartItem
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== productId,
    );
    this.setState({
      cartItems: updatedCartItems,
    });
  }

  handleDownVote(productId) {
    const { products } = this.state;
    const newDownVoteProduct = products.find(
      (product) => product.id === productId,
    );
    if (
      newDownVoteProduct.votes.downVotes.currentValue <
      newDownVoteProduct.votes.downVotes.lowerLimit
    ) {
      newDownVoteProduct.votes.downVotes.currentValue += 1;
    }
    this.setState({
      products: products,
    });
  }

  handleUpVote(productId) {
    const { products } = this.state;
    const newUpVoteProduct = products.find(
      (product) => product.id === productId,
    );
    if (
      newUpVoteProduct.votes.upVotes.currentValue <
      newUpVoteProduct.votes.upVotes.upperLimit
    ) {
      newUpVoteProduct.votes.upVotes.currentValue += 1;
    }
    this.setState({
      products: products,
    });
  }

  handleSetFavorite(productId) {
    const { products } = this.state;
    const newFavoriteProduct = products.find(
      (product) => product.id === productId,
    );
    if (newFavoriteProduct.isFavorite === false) {
      newFavoriteProduct.isFavorite = true;
    } else {
      newFavoriteProduct.isFavorite = false;
    }
    this.setState({
      products: products,
    });
  }

  render() {
    const {
      cartItems,
      products,
      isLoading,
      hasError,
      loadingError,
    } = this.state;

    return (
      <Home
        cartItems={cartItems}
        products={products}
        isLoading={isLoading}
        hasError={hasError}
        loadingError={loadingError}
        handleDownVote={(productId) => {
          this.handleDownVote(productId);
        }}
        handleUpVote={(productId) => {
          this.handleUpVote(productId);
        }}
        handleSetFavorite={(productId) => {
          this.handleSetFavorite(productId);
        }}
        handleAddToCart={(productId) => {
          this.handleAddToCart(productId);
        }}
        handleRemove={(productId) => {
          this.handleRemove(productId);
        }}
        handleChange={() => {}}
      />
    );
  }
}

export default App;
