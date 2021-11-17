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

<style>
  .catalog__list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }

  .catalog__item {
    width: calc(100% / 3 - 60px);
    border: 1px solid #cacaca;
    margin-bottom: 30px;
  }

  .catalog__item:not(:nth-child(3n)) {
    margin-right: 30px;
  }

</style>
