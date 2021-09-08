<template>
    <div class="arical">
        <div id="content" class="container">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="form.region" placeholder="请选择文章类型">
                        <el-option label="JavaScript" value="JavaScript"></el-option>
                        <el-option label="Vue" value="Vue"></el-option>
                        <el-option label="遇到的问题" value="遇到的问题"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容">
                    <el-col :span="11">
                        <!-- mkd -->
                        <mavon-editor style="width: 1000px;height: 500px;margin-top: 20px;" v-model="context"
                            :ishljs="true" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel" />
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button v-show="btnShow" type="success" @click="onCreator">立即修改</el-button>
                    <el-button v-show="!btnShow" type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button :plain="true" v-show="false" @click="open1">消息</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import api from "../../api/index";
    export default {
        name: "BlogArtical",

        data() {
            return {
                context: "", //输入的数据
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    help: true, // 帮助
                    code: true, // code
                    subfield: true, // 是否需要分栏
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    /* 1.3.5 */
                    undo: true, // 上一步
                    trash: true, // 清空
                    // save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                },
                form: {
                    //标题
                    name: "",
                    //文字类型
                    region: "",

                    delivery: false,
                    type: [],
                    resource: "",
                    desc: "",
                },
                //html,
                blog: {
                    id: "",
                    username: "",
                    title: "",
                    types: "",
                    context: "",
                    _id: ""
                },
                //remov
                remov: {
                    url: ""
                },
                //所有文章
                result: "",
                //文章信息
                titles: {},
                //修改按钮
                btnShow: false,

            };
        },

        mounted() {
            console.log(this.$route.query)
            if (!this.$route.query.row) {
                this.btnShow = false;
            } else {
                this.btnShow = true;
                this.titles = this.$route.query;
                this.form.name = this.titles.row.title;
                this.form.region = this.titles.row.types;
                this.context = this.titles.row.context
            }

        },

        methods: {
            async onSubmit() {
                //把用户名 文章标题 文章类型 文章类型 传送到服务器
                let title = JSON.parse(sessionStorage.getItem("person"));
                //请求有多少文章
                this.result = await api.getMkds()
                //这里是给他的id 设置文章数量加一，为了方便以后查询某篇文章
                this.blog.id = this.result.data.length + 1
                console.log(this.blog.id)
                this.blog.username = title.username;
                this.blog.title = this.form.name;
                this.blog.types = this.form.region;
                this.blog.context = this.$refs.md.d_render;
                let cont = JSON.stringify(this.blog);
                let objcont = JSON.parse(cont);
                let result = await api.getMkdown(objcont);
                console.log(result);
                console.log(this.$refs.md.d_value);
                //提交之后
                this.open1();
                this.form.name = "";
                this.form.region = "";
                this.context = ""
            },
            //修改
            async onCreator() {
                this.blog.id = this.$route.query.row.id
                this.blog.username = this.$route.query.row.username;
                this.blog.title = this.form.name;
                this.blog._id = this.$route.query.row._id;
                this.blog.types = this.form.region;
                this.blog.context = this.$refs.md.d_render;
                console.log(this.blog)
                let StrJson = JSON.stringify(this.blog)
                let person = JSON.parse(StrJson)
                let result = await api.CreateMkd(person)
                console.log(result)
                this.open1()
            },
            async $imgAdd(pos, $file) {
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('image', $file);
                let resule = await api.getMkImag(formdata);
                console.log(resule)
                this.remov.url = resule.data.imgUrl
                // 替换掉当前的url
                this.$refs.md.$img2Url(pos, `http://localhost:2358${resule.data.imgUrl}`)
            },
            async $imgDel(pos) {
                let result = await api.ReMkImag(this.remov);
                console.log(result)
                // delete this.img_file[pos];
            },
            open1() {
                this.$message({
                    showClose: true,
                    message: '恭喜你，这是一条成功消息',
                    type: 'success'
                });
            }
        },
    };
</script>

<style lang="scss" scoped>
    .container {
        margin-left: 40px;
        margin-top: 40px;
    }

    #content {
        .el-input {
            width: 30%;
            padding-left: 20px;
        }

        .el-select {
            width: 30%;
            padding-left: 20px;
        }

        .el-form-item {
            .el-col {
                margin-top: -18px;
                padding-left: 20px;
            }
        }

        .pmd {
            min-height: 570px;
            width: 1000px;
        }

        .el-form-item {
            .el-button {
                margin-left: 20px;
            }
        }
    }

</style>
