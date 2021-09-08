const mongoose = require("./db");
const LoginState = new mongoose.Schema({
    username: {type:String,unique:true},
    passwrod: {
        type: String,
        //加密
        set(val) { 
            //要加密的密码 密码强度
            return require('bcrypt').hashSync(val,10)
        }
    },
    activerImg:String

})
const LoginModel = mongoose.model("login", LoginState, "login");
module.exports = LoginModel;