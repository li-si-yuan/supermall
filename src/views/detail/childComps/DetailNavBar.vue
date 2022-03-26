<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" 
            :key="item" 
            class="title-item"
            :class="{active: index === currentIndex}"
            @click="titleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    };
  },

  mounted() {
    
  },

  methods: {
    backClick() {
      // this.$router.back()
      this.$router.go(-1)
    },
    titleClick(index) {
      this.currentIndex = index
    }
  },
};
</script>

<style scoped>
  .back {
    margin-top: 7px;
  }
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 13px;
  }
  .active {
    color: #ff8e98;
  }
</style>