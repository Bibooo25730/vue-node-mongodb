import axios from 'axios';
let constApi = 'http://localhost:2358/'
//登录
export async function getLogin(user) {
    let result = ''
    await axios({
        url: `${constApi}login`,
        method: 'post',
        data: user,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        response => {
            result = response.data
        },
        error => {
            result = error.response.data.message
        },

    )
    return result

}
//个人信息
export async function getPersonal(token) {
    let result = '';
    await axios({
        url: `${constApi}Personal`,
        method: 'get',
        data: token,
        headers: {
            'Authorization': 'Basic ' + token
        }
    }).then(
        response => {
            result = response.data
        },
        error => {
            result = error.response.data.message
        },

    )
    return result
}
//mkd
export async function getMkdown(blog) {
    console.log(blog)
    let result = '';
    await axios({
        url: `${constApi}Mkdown`,
        method: 'post',
        data: blog,

    }).then(
        response => {
            result = response
        },
        error => {
            result = error
        },

    )
    return result
}
//mkd上传的图片
export async function getMkImag(formDate) {
    console.log(formDate)
    let result = '';
    await axios({
        url: `${constApi}Mkimg`,
        method: 'post',
        data: formDate,
    }).then(
        response => {
            result = response
        },
        error => {
            result = error.response.data.message
        },

    )
    return result
}
//Mkd删除的图片
export async function ReMkImag(url) {

    let result = '';
    await axios({
        url: `${constApi}ReMkimg`,
        method: 'post',
        data: url,
    }).then(
        response => {
            result = response
        },
        error => {
            result = error.response.data.message
        },

    )
    return result
}
//mkd数据库所有的文章
export function getMkds() {
    return axios.get(`${constApi}mkdowns`)
}
//模糊搜索mkd的文章
export function SearchMkd(title) {
    return axios.get(`${constApi}SearchMkdon?title=${title}`)
}
//删除Mkd的文章
export function RemoveMkd(id) {
    return axios.get(`${constApi}RemoveMkdon?id=${id}`)
}
//修改mkd的文章
export async function CreateMkd(url) {
    let result = '';
    await axios({
        url: `${constApi}Creater`,
        method: 'post',
        data: url,
    }).then(
        response => {
            result = response
        },
        error => {
            result = error.response.data.message
        },

    )
    return result
}
//上传评论
export function ConteMkd(title) {
    return axios.get(`${constApi}comment?title=${title}`)
}
//评论返回
export function Clod() {
    return axios.get(`${constApi}getcomment`)
   
}
export default {
    getLogin, getPersonal, getMkdown, getMkImag, ReMkImag, getMkds, SearchMkd, RemoveMkd, CreateMkd,ConteMkd,Clod
}