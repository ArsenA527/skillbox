<template>
  <!-- <MainPage v-if="currentPage === 'main'"/>
  <ProductPage v-else-if="currentPage === 'product'"/>
  <NotFoundPage v-else/> -->

  <component
    :is="currentPageComponent"
    :page-params="currentPageParams"
    @gotoPage="(pageName, pageParams) => gotoPage(pageName, pageParams)"
  />
</template>

<script>
import MainPage from './pages/MainPage.vue';
import ProductPage from './pages/ProductPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {

  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },

  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage';
    },
  },

  methods: {
    gotoPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    },
  },

  components: {
    MainPage,
    ProductPage,
    NotFoundPage,
  },

};
</script>
