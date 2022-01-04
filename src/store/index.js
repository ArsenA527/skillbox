/* eslint-disable max-len */
import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line quotes
import products from "@/data/products";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [{
      productId: 1,
      amount: 2,
    }],
  },

  mutations: {
    addProductToCart(state, {
      productId,
      amount,
    }) {
      const item = state.cartProducts.find((el) => el.productId === productId);

      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
    updateCartProductAmount(state, {
      productId,
      amount,
    }) {
      const item = state.cartProducts.find((el) => el.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
    incrementCartItem(state, productId) {
      const item = state.cartProducts.find((el) => el.productId === productId);
      item.amount += 1;
    },
    decrementCartItem(state, productId) {
      const item = state.cartProducts.find((el) => el.productId === productId);
      if (item.amount > 1) item.amount -= 1;
    },
  },
  getters: {
    cartDetailProducts(state) {
      // eslint-disable-next-line arrow-body-style
      return state.cartProducts.map((item) => {
        return {
          ...item,
          product: products.find((p) => p.id === item.productId),
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item
        .amount) + acc, 0);
    },
    cartTotalAmount(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => +item.amount + acc, 0);
    },
  },

});
