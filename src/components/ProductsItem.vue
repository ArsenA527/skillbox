<template>
  <div>
    <a href="#" class="catalog__pic">
      <img :src="imgsrc" :alt="title">
    </a>
    <div class="catalog__info">
      <h3 class="catalog__title">
        <a href="#">
          {{ title }}
        </a>
      </h3>
      <span class="catalog__price">
        {{ price }}
      </span>
    </div>

  </div>
</template>

<script>

export default {
  props: ['imgsrc', 'title', 'price'],
};
</script>

<style>
  a {
    color: #000;
    text-decoration: none;
  }

  .catalog__pic {
    width: 100%;
  }

  .catalog__pic img {
    width: 100%;
    height: 300px;
    object-fit: contain;
  }

  .catalog__info {
    padding: 15px;
  }

  .catalog__title {
    font-size: 24px;
  }

  .catalog__price {
    text-align: right;
  }

</style>
