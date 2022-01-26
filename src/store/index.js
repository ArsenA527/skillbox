/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
/* eslint-disable max-len */
import axios from 'axios';
// eslint-disable-next-line import/order
import API_BASE_URL from '@/config';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [{
      productId: 1,
      amount: 2,
    }],

    usserAccessKey: null,
    cartProductsData: [],
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
    incrementCartItem(state) {
      // const item = state.cartProducts.find((el) => el.productId === productId);
      console.log(state.cartProducts);
      state.cartProducts.amount += 1;
    },
    decrementCartItem(state) {
      // const item = state.cartProducts.find((el) => el.productId === productId);
      if (state.cartProducts.amount > 1) state.cartProducts.amount -= 1;
    },

    updateUsserAccessKey(state, accessKey) {
      state.usserAccessKey = accessKey;
    },

    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },

    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        };
      });
    },
  },
  getters: {
    cartDetailProducts(state) {
      // eslint-disable-next-line arrow-body-style
      return state.cartProducts.map((item) => {
        // eslint-disable-next-line prefer-destructuring
        const product = state.cartProductsData.find(p => p.product.id === item.productId)
          .product;
        return {
          ...item,
          product: {
            ...product,
            imgsrc: product.image.file.url,
          },
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

  actions: {
    loadCart(context) {
      axios
        // eslint-disable-next-line prefer-template
        .get(API_BASE_URL + '/api/baskets', {
          UsserAccessKey: context.state.usserAccessKey,
        })
        // eslint-disable-next-line arrow-parens
        .then(response => {
          if (!response.data.accessKey) {
            localStorage.setItem('usserAccessKey', response.data.accessKey);
            context.commit('updateUsserAccessKey', response.data.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
  },

});
