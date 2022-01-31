/* eslint-disable  */
import axios from 'axios';
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

    userAccessKey: null,
    cartProductsData: [],
  },

  mutations: {
    // addProductToCart(state, {
    //   productId,
    //   amount,
    // }) {
    //   const item = state.cartProducts.find((el) => el.productId === productId);

    //   if (item) {
    //     item.amount += amount;
    //   } else {
    //     state.cartProducts.push({
    //       productId,
    //       amount,
    //     });
    //   }
    // },
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

    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
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
      return state.cartProducts.map((item) => {
        const product = state.cartProductsData.find(p => p.product.id === item.productId)
          .products;
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
      return axios
        .get(API_BASE_URL + '/api/baskets', {
          UsserAccessKey: context.state.userAccessKey,
        })
        .then(response => {
          if (!response.data.accessKey) {
            localStorage.setItem('userAccessKey', response.data.accessKey);
            context.commit('updateUserAccessKey', response.data.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },

    addProductCart(context, {
      productId,
      amount
    }) {
      return (new Promise(resolve => setTimeout(resolve, 2000)))
        .then(() => {
          return axios.post(API_BASE_URL + '/api/baskets/products', {
            productId: productId,
            quantity: amount,
          }, {
            params: {
              UsserAccessKey: context.state.userAccessKey,
            }
          }).then(response => {
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts');
          });
        })

    },

    updateCartProductAmount(context, {
      productId,
      amount
    }) {
      context.commit('updateCartProductsData', {
        productId,
        amount
      });

      if (amount < 1) {
        return;
      }

      return axios.put(API_BASE_URL + '/api/baskets/products', {
          productId: productId,
          quantity: amount,
        }, {
          params: {
            UsserAccessKey: context.state.userAccessKey,
          }
        }).then(response => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    }

  },

});
