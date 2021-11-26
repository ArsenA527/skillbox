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

    <ul class="colors colors--black">
      <li class="colors__item">
        <label class="colors__label">
          <input type="radio" class="colors__radio sr-only" value="#73b6ea" v-model="color">
          <span class="colors__value" style="background-color: #73b6ea;"></span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input type="radio" class="colors__radio sr-only" value="#88e000" v-model="color">
          <span class="colors__value" style="background-color: #88e000;"></span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input type="radio" class="colors__radio sr-only" value="#222" v-model="color">
          <span class="colors__value" style="background-color: #222;"></span>
        </label>
      </li>
    </ul>

  </div>
</template>

<script>

export default {
  data() {
    return {
      color: '#73b6ea',
    };
  },

  props: ['imgsrc', 'title', 'price'],
};
</script>
