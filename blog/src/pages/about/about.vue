<template>
    <div id="content">
        <top-nav></top-nav>
      <div class="content">
        <h3 class="title">关于</h3>
        <div class="about-content">
            xxxxxxxxxxx的拉到老哦定律拉到的的顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶
            xxxxxxxxxxx的拉到老哦定律拉到的的
            xxxxxxxxxxx的拉到老哦定律拉到的的
        </div>
    </div>
    </div>
</template>
<script>
export default{
    name:'About',
    data() {
        return {
            
        }
    },
}
</script>

<style scoped lang="scss">
.content{
    padding: 20px;
    width: 750px;
    margin: 0 auto;
    @media screen and (max-width: 770px) {
    width: 100%;
    margin: 0 auto 70px;
  }
    .title{
        font-size: 20px;
    }
    .about-content{
        font-size: 16px;
        padding-top: 20px;
        color: #888;
        line-height: 25px;
        /* 强制换行 */
        word-wrap: break-word;
    }
}
</style>