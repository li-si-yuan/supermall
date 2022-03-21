<template>
  <div class="homerecommend">
    <div v-for="item in recommends" :key="item.image">
      <a href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },
 
};
</script>

<style  scoped>

</style>