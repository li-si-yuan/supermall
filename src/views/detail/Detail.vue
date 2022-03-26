<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import  DetailNavBar from './childComps/DetailNavBar.vue'

import {getDetail} from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar
  },
  data() {
    return {
      iid: null
    };
  },
  created() {
    this.iid = this.$route.params.iid

    getDetail(this.iid).then(res => {
      console.log(res);
    })
  },
};
</script>

<style scoped>

</style>