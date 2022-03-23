<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue';

export default {
  components: { GoodsListItem },
  name: 'GoodsList',
  computed: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>