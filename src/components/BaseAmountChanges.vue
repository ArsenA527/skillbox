<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="count(amount - 1)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model="amount">

    <button type="button" aria-label="Добавить один товар" @click.prevent="count(amount + 1)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  model: {
    prop: 'amount',
    event: 'count',
  },

  props: ['amount'],

  methods: {
    count(amount) {
      if (amount > 0) this.$emit('count', amount);
    },
  },
};
</script>
