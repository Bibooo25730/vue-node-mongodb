<template>
  <div class="Home">
    <top-nav></top-nav>
    <router-link :to="{path:'/detail',query:{url:data}}">
      <div class="container">
        <div class="content">
          <i class="iconfont icon-laba"></i>
          <span class="notify-content">公告:欢迎来到我的轻博客</span>
        </div>
        <div class="artical-item" v-for="(item,index) in data">
          <h3 class="title">{{item.title}}</h3>
          <p class="publish_data">类型：{{item.types}}</p>
          <div class="artical-content">
                 {{item.context}}
          </div>
          <div class="comment-box">
            <a href="#">评论</a>
            <a href="#">点赞</a>
          </div>
        </div>

      </div>
    </router-link>
  </div>
</template>

<script>
  import api from "../../api/index"
  export default {
    name: 'BlogHome',
    data() {
      return {
        data: []
      };
    },

    async mounted() {
      let result = await api.getMkds()
      this.data = result.data
    },

    methods: {

    },
  };
</script>

<style lang="scss" scoped>
  .container {
    width: 770px;
    margin: 0 auto;
    padding: 10px 10px 10px 10px;

    @media screen and (max-width: 770px) {
      width: 100%;
      margin: 0 auto 70px;
    }

    .content {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 70px;
      background-color: #fff;

      .icon-laba {
        font-size: 30px;
        color: #999;
      }

      .notify-content {
        font-size: 18px;
        color: #737373;
      }
    }
  }

  .artical-item {
    background-color: #fff;
    margin-top: 15px;
    display: flex;
    font-size: 12px;
    flex-direction: column;
    justify-content: space-around;

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
      max-height: 200px;
      color: #464646;
      overflow: hidden;
      margin-top: -20px;
      // padding-bottom: 10px;
      padding: 0px 30px 15px 20px;
    }

    .comment-box {
      display: flex;
      justify-content: space-around;
      height: 50px;
      background-color: #f9f9f9;
      font-size: 12px;

      a {
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 15px;
        text-decoration: none;
        color: #444;
      }
    }
  }

</style>
