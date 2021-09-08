const mongse = require('./db')
const Mkdown = new mongse.Schema({
    //标题
    context:{type:String}
})
const ModownPerson = mongse.model('context', Mkdown, 'context')
module.exports = ModownPerson;