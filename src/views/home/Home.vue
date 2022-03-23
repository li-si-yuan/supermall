<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-views></feature-views>
    <tab-control class="tab=control" :titles="['流行','新款','精选']"></tab-control>
    <goods-list :goods="goods['pop'].list"></goods-list>
    
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureViews from './childComps/FeatureViews'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {
  getHomeMultidata,
  getHomeGoods
  } from 'network/home'
export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureViews,
    NavBar,
    TabControl,
    GoodsList

  },
  data() {
    return {
      banners : [],
      recommends: [],
      mes: null,
      goods: {
        'pop': {page: 0,list: []},
        'new': {page: 0,list: []},
        'sell': {page: 0,list: []},
      }
    }
  },
  created() {
    this.getHomeMultidata(),
    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')

  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      this.mes = res
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        // console.log(this.goods.pop);
        this.goods[type].page += 1
    })
    }
  }
};
</script>

<style scoped>
  #home {
  padding-top: 44px;
  }
  .home-nav {
    position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>