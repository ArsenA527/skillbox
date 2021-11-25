<template>
  <section class="catalog">
    <ProductsList :products="products" />
    <BasePagination :page="page" :count="countProducts" :per-page="productsPerPage" />
  </section>
</template>

<script>

import products from './data/products';
import ProductsList from './components/ProductsList.vue';
import BasePagination from './components/BasePagination.vue';

export default {
  name: 'App',

  components: {
    ProductsList,
    BasePagination,
  },

  data() {
    return {
      page: 1,
      productsPerPage: 3,
    };
  },

  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return products.length;
    },
  },
};
</script>
