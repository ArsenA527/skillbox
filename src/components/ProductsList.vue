<template>
    <section class="catalog">
    <ul class="catalog__list">
      <li  class="catalog__item" v-for="(product, index) in products" :key="index">
        <ProductsItem :imgsrc="product.imgsrc" :title="product.title" :price="product.price"/>
      </li>
    </ul>
  </section>
</template>

<script>
import ProductsItem from './ProductsItem.vue';

export default {

  components: {
    ProductsItem,
  },
  props: ['products'],
};
</script>
