<template>
    <div class="context">
        <div class="make-comment">
            <h3>发表评论</h3>
            <transition name="animate__animated animate__bounce" enter-active-class="animate__animated animate__backInUp"
              leave-active-class="animate__backOutDown">
              <img v-show="isShow" class="comment" key="3" src="../../assets/img/ZzaGcV.png" alt="" />
            </transition>
            <textarea name="text" @click="down" @mouseleave="mouseLeave" rows="5" maxlength="200"
              placeholder="居然什么也不说,哼" v-model="mess"></textarea>
            <input class="issue" type="button" @click="sublit"  value="发布" />
          </div>
    </div>
</template>

<script>
     import "animate.css";
export default {
    name: 'BlogContext',

    data() {
        return {
            mess:"",
            isShow: false,
        };
    },

  
    methods: {
    down() {
        this.isShow = true;
      },
      mouseLeave() {
        this.isShow = false;
    },
    async sublit(){
        let result = await api.ConteMkd(this.mess)
        console.log(this.mess)
      }
}
};
</script>

<style lang="scss" scoped>
 .make-comment {
      position: relative;
      padding: 0px 20px 0 20px;
      overflow: hidden;

      h3 {
        font-size: 18px;
        color: #7892a0;
      }

      textarea {
        resize: none;
        width: 100%;
        border: 1px solid #ccc;
      }

      .comment {
        width: 130px;
        height: auto;
        position: absolute;
        bottom: 32px;
        right: 20px;
        background-repeat: no-repeat;
      }
    }
    .issue {
      float: right;
      width: 50px;
      margin-top: 5px;
      line-height: 30px;
      font-size: 15px;
      border-radius: 10px;
      color: #fff;
      background-color: #0b8a87;
    }
</style>