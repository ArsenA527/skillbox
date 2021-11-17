<template>
  <div>
      <a href="#" class="catalog__pic">
        <img :src="imgsrc" :alt="title">
      </a>

      <h3 class="catalog__title">
        <a href="#">
          {{ title }}
        </a>
      </h3>

      <span class="catalog__price">
        {{ price }}
      </span>
  </div>
</template>

<script>

export default {
  props: ['imgSrc', 'title', 'price'],
};
</script>

<style>
  a {
    color: #000;
    text-decoration: none;
  }

  .catalog__pic {
    width: 100%;
    background: olivedrab;
  }

  .catalog__title {
    font-size: 24px;
  }

  .catalog__price {
    text-align: right;
  }

</style>
