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
