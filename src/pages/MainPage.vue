<template>
    <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductsFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color-value.sync="filterColor"
      />
      <section class="catalog">
        <ProductsList
          :products="products"
        />
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>

<script>

import axios from 'axios';
// eslint-disable-next-line import/named
import { API_BASE_URL } from '../config';
// import products from '@/data/products';
import ProductsList from '@/components/ProductsList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductsFilter from '@/components/ProductsFilter.vue';

export default {

  components: {
    ProductsList,
    BasePagination,
    ProductsFilter,
  },

  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 0,
      page: 1,
      productsPerPage: 3,
      productsData: null,
    };
  },

  computed: {
    products() {
      // const offset = (this.page - 1) * this.productsPerPage;
      // return this.filteredProducts.slice(offset, offset + this.productsPerPage);
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          imgsrc: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      // return this.filteredProducts.length;
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },

  methods: {
    loadProducts() {
      clearTimeout(this.loadPorductsTimer);
      this.loadPorductsTimer = setTimeout(() => {
        // eslint-disable-next-line prefer-template
        axios.get(API_BASE_URL + '/api/products', {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
          },
        })
          // eslint-disable-next-line no-return-assign
          .then((response) => this.productsData = response.data);
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },

    filterPriceFrom() {
      this.loadProducts();
    },

    filterPriceTo() {
      this.loadProducts();
    },

    filterCategoryId() {
      this.loadProducts();
    },

  },

  created() {
    this.loadProducts();
  },
};
</script>
