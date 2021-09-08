var express = require('express');
var app = express()
var url = require('url');
var crypto = require('crypto')
var bodyParser = require('body-parser');
var Mkdown = require("./model/mongse")
var MkCont = require("./model/comment ")
var LoginModel = require("./model/login")
const fs = require('fs');
//存放
app.use(express.static('public'));
const multer = require('multer')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //    指定文件存放路径
        cb(null, "./public/imgurl/")
    },
    filename: function (req, file, cb) {
        // 指定文件名,先获取扩展,随机生成文件名保存给保存文件的方法
        //获取文件扩展名
        let exts = file.originalname.split(".")
        let ext = exts[exts.length - 1] //为了防止上传图片时,图片的名称中含多个点,从后面取最后一个解决问题
        let tmpname = Date.now() + parseInt(Math.random() * 9999) //时间戳+随机数生成文件名
        cb(null, `${tmpname}.${ext}`)
    }
})
// 使用磁盘引擎的配置调用方法
let upload = multer({ storage: storage })
// 上传文件路由,使用single 方法接收前端 图片的name属性是'logo'的图片,保存到req.file
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
//密钥 应该写在环境变量里面 git github忽略的文件里面
const SECRET = 'dlldjadlalmldalda';
const jwt = require('jsonwebtoken')

//测
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/text', function (req, res) {
    res.send('hello Bibooo!')
})
//注册
app.get('/signin', async function (req, res) {
    var isSign = await LoginModel.create({
        username: 'Bibooo',
        passwrod: '112483051'
    })
    res.send(isSign)
})
//登陆
app.post('/login', async function (req, res) {
    //账号
    var isUser = await LoginModel.findOne({
        username: req.body.username
    });
    if (!isUser) {
        return res.status(422).send({
            message: '用户名不存在'
        })
    }
    //密码
    const isPas = require('bcrypt').compareSync(
        req.body.password,
        isUser.passwrod
    )


    if (!isPas) {
        return res.status(422).send({
            message: '密码无效'
        })
    }
    //生成token加密

    const token = jwt.sign({
        //key
        id: String(isUser._id)
    }, SECRET, { expiresIn: 60 * 60 * 6 }) //token生效时间

    res.send({
        isUser,
        token: token
    })
})
//中间间 验证token
const auth = async (req, res, next) => {
    const row = String(req.headers.authorization).split(' ').pop()
    console.log('传递的token', row)
    //验证返回一个结果  解密token
    // const tokenDate = jwt.verify(row, SECRET)我们只要id
    try {
        const { id } = jwt.verify(row, SECRET)
        req.user = await LoginModel.findById(id)
        next()
    } catch (err) {
        console.log(err)
        req.user = 'token无效'
        next()
    }


}
//个人信息
app.get('/Personal', auth, async function (req, res) {
    res.send(req.user)
})
//mkd pmd上传的东西
app.post('/Mkdown', async function (req, res) {
    var ismK = await Mkdown.create({
        id: req.body.id,
        username: req.body.username,
        title: req.body.title,
        types: req.body.types,
        context: req.body.context
    })
    res.status(200).send('OK');
})
//mkd上传的图片
app.post('/Mkimg', upload.single('image'), async (req, res) => {

    let files = req.file;
    if (!req.file) {
        return res.send("未上传图片或者文图片格式不正确！");
    }
    let imgUrl = `/imgurl/${req.file.filename}`
    res.send({ err: 0, msg: "ok", imgUrl })

})
app.post('/ReMkimg', async (req, res) => {

    //删除的url
    let url = req.body.url;
    fs.unlink(`public\\${url}`, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('删除成功')
    })

})
//查询提交信息mkdown所有信息
app.get('/mkdowns', async function (req, res) {
    let result = await Mkdown.find()
    res.send(result)
})
//搜索mkdown的信息
app.get('/SearchMkdon', async function (req, res) {
    let Monogse = await Mkdown.find({ 'context': { $regex: `${req.query.title}` } })
    res.send(Monogse);
})
//删除mkdown的文章
app.get('/RemoveMkdon', async function (req, res) {
    console.log(req.query)
    let _id = req.query.id;
    let Mongse = await Mkdown.remove({ '_id': `${_id}` })
    res.send('删除成功')
})
//修改mkdown的文章
app.post('/Creater', async function (req, res) {
    console.log(req.body)
    res.send('d')
    let Mongse = await Mkdown.updateOne({ "_id": req.body._id }, { $set: { "username": req.body.username, "title": req.body.title, "types": req.body.types, "context": req.body.context } });
})
//保存用户的评论    
app.get('/comment', async function (req, res) {

    let MkCon = await MkCont.create({
        context: req.query.title
    })

})
//返回用户的评论
app.get('/getcomment', async function (req, res) {
    let MkCon = await MkCont.find()
    res.send(MkCon)

})
app.listen(2358, function () {

    console.log('2358,中间件,已经运行')
})

