<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                  @tabClick="tabClick" 
                  ref="tabControl1"
                  class="tab-control"
                  v-show="isTabFixed"></tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll" 
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-views></feature-views>
      <tab-control :titles="['流行','新款','精选']"
                  @tabClick="tabClick" 
                  ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>

    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureViews from './childComps/FeatureViews'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

import {
  getHomeMultidata,
  getHomeGoods
  } from 'network/home'
import {debounce} from 'common/utils'

import Scroll from 'components/common/scroll/Scroll.vue'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureViews,
    NavBar,
    TabControl,
    GoodsList,
    BackTop,
    Scroll,
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
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
  },
  created() {
    this.getHomeMultidata(),
    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')

  },
  mounted() {

    this.$refs.swiper

    const refresh = debounce(this.$refs.scroll.refresh,500)
      this.$bus.$on('homeItemImageLoad',() => {
        refresh()
})
  },
  methods: {
    
    // 事件监听
    tabClick(index) {
      switch(index) {
        case 0: 
          this.currentType = 'pop'
          break
        case 1: 
          this.currentType = 'new'
          break
        case 2: 
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position) {
      this.isShowBackTop = (-position.y)>1000?true:false

      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    // 网络请求
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
        this.$refs.scroll.finishPullUp()
    })
    }
  }
};
</script>

<style scoped>
  #home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
  }
  .home-nav {
    background-color: #ff8e98;
    /* position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0; */
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  /* .content {
    height: calc(100% - 49px);
    margin-top: 44px;
  } */
</style>