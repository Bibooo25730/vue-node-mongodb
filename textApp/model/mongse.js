const mongse = require('./db')
const Mkdown = new mongse.Schema({
    //标题
    id:{type:String,unique:true},
    username: { type: String },
    title: { type: String },
    types: { type: String },
    context:{type:String}
})
const ModownPerson = mongse.model('Mkdown', Mkdown, 'Mkdown')
module.exports = ModownPerson;