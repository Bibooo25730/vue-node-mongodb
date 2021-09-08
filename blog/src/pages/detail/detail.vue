<template>
  <div class="detail">
    <top-nav></top-nav>
    <div v-for="(item,index) in message" :key="index"  class="artical-item">
      <h3 class="title">{{item.title}}</h3>
      <p class="publish_data">类型：{{item.types}}</p>
      <div class="artical-content" v-html="item.context">
      </div>
    <context></context>
   
      <div class="find-review">
        <div class="give-like">
          <i class="iconfont icon-dianzan"></i>
          <span>1000+</span>
        </div>
        <div class="Review" v-for="(item,index) in messa" :key="index">
          <p style="font-size: 10px;">{{item.context}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "../../api/index"
  import context from "../detail/context"
 
  export default {
    name: "BlogDetail",
    components:{context},
    data() {
      return {
        //控制动画隐藏显示
      
        message:[],
        mess:"",
        messa:""
      };
    },

  async  mounted() {
     this.message = this.$route.query.url
      let result = await api.Clod()
      this.messa = result.data
     },

    methods: {
    
      },
   
 
  };
</script>

<style lang="scss" scoped>
  .artical-item {
    width: 750px;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 15px;
    display: flex;
    font-size: 12px;
    flex-direction: column;

    justify-content: space-around;

    @media screen and (max-width: 750px) {
      width: 350px;
      padding: 20px;
      margin: 20px auto 20px;
    }

    .title {
      font-size: 20px;
      color: #464646;
      //字体过长省略号
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0px 20px 0 20px;
    }

    .publish_data {
      font-size: 13px;
      margin-top: 13px;
      padding: 0px 20px 0 20px;
      color: #adadad;
    }

    .artical-content {
      white-space: pre-line;
      font-size: 14px;
      line-height: 28px;
      color: #464646;
      overflow: hidden;
      margin-top: 20px;
      // padding-bottom: 10px;
      padding: 0px 30px 15px 20px;
    }

   

   
  }

  .find-review {
    padding: 5px 20px 20px 20px;

    .give-like {
      .icon-dianzan {
        font-size: 25px;
        color: #999;
      }

      span {
        font-size: 20px;
        color: #999;
      }
    }

    .Review {
      margin-top: 20px;
      text-indent: 20px;
      height: auto;

      p {

        font-size: 18px;
        padding-top: 20px;

      }
    }
  }

</style>
