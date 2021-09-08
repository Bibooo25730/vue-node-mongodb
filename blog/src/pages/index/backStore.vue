<template>
  <div class="backstore">
    <keep-alive >
      <back-nav></back-nav>
    </keep-alive>
    
    <left-nav></left-nav>
    <div class="show-title">
    <router-view class="left-nav"></router-view>
      </div>
  </div>
</template>

<script>
import api from '../../api/index'
export default {
  name: "BlogBackstore",

  data() {
    return {
      input2: "",
    
    };
  },
  mounted() {
   
    //  let result = this.$route.params.user;
    //  if(result.isUser){
    //   this.person = result.isUser
    //  }else{
    //   this.person = result
    //  }
    //  sessionStorage.setItem('person',JSON.stringify(this.person))
    //  console.log(this.person)
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.left-nav{
    float: right;
    width: 90%;
    height: 92.5%;
    overflow: hidden;
}
</style>
