// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './pages/index/index'
import router from './pages/components/common/router.js';
import store from './pages/components/common/store'
//使用ele ui
import { Button, Input, Row, Col, Table, TableColumn, Pagination, Form, Select, Option, FormItem , Message, MessageBox,} from 'element-ui';
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Pagination.name, Pagination);
Vue.component(Form.name, Form);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(FormItem.name, FormItem);
Vue.component(Message.name, Message);
Vue.component(MessageBox.name, MessageBox); 
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm
// markdown
// import pmd from 'perfect-markdown'  // 或 import pmd from 'perfect-markdown/lib/pmd.umd.min. js' 
// Vue.use ( pmd ,  { store } )  // 註冊 pmd vuex 模塊
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// 在 main.js 引用
//全局组件自动加载器
import aotoLoad from './pages/components/common/autoLoad.js';
//全局样式
import "./pages/components/common/reset.css"
import "./pages/components/common/global.css"
//iconfont
import "./pages/components/common/iconfont/iconfont.css"

aotoLoad.startLoad()
import 'amfe-flexible'
// 在 node_modules / lib-flexible / flexible.js
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:h => h(App)
})
