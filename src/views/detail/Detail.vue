<template>
  <div id="detail">
    <detail-nav-bar class="detali-nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" 
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="list" :goods="recommends"></goods-list>
   </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import  DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {debounce} from 'common/utils'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      Tops: [],
      isShowBackTop: false,
    };
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,this.Tops[index],100)
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position) {
	    	// 决定backTop按钮是否显示
		    this.showBackTop = position.y <= -1000
	    	// 监听滚动到某个主题
        this._listenScrollTheme(-position.y)
	    },
      _listenScrollTheme(position) {
	      let length = this.Tops.length;
	      for (let i = 0; i < length; i++) {
		      let iPos = this.Tops[i];
		      
		      if (position >= iPos && position < this.Tops[i+1]) {
			      if (this.currentIndex !== i) {
				      this.currentIndex = i;
			      }
			      break;
		      }
	      }
      },
    addToCart() {
        // 2.将商品信息添加到Store中
        const product = {}
        product.iid = this.iid
        product.imgURL = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        this.$store.commit('addCart',product)
	    },
  },
  created() {
    this.iid = this.$route.params.iid

    getDetail(this.iid).then(res => {
      const data = res.result
      // console.log(data);
      this.topImages = data.itemInfo.topImages
    
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
    
      this.shop = new Shop(data.shopInfo)

      this.detailInfo = data.detailInfo

      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
    
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  updated() {
    this.Tops = []
    this.Tops.push(0)
    this.Tops.push(-this.$refs.param.$el.offsetTop)
    this.Tops.push(-this.$refs.comment.$el.offsetTop)
    this.Tops.push(-this.$refs.list.$el.offsetTop)
  },
  mounted() {
    const newrefresh = debounce(this.$refs.scroll.refresh,500)
    this.$bus.$on('detailItemImageLoad',() => {
        newrefresh()
    })
  }
};
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detali-nav {
    position: relative;
    z-index: 10;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px -58px);
  }
</style>