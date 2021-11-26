<template>
    <section class="catalog">
    <ul class="catalog__list">
      <li  class="catalog__item" v-for="(product) in products" :key="product.title">
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
