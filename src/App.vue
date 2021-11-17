<template>
  <div>
    <ProductsList :products="products"/>
  </div>
</template>

<script>

import products from './data/products';
import ProductsList from './components/ProductsList.vue';

export default {
  name: 'App',

  components: {
    ProductsList,
  },

  data() {
    return {
      products,
    };
  },

};
</script>
