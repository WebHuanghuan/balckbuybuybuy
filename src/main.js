import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// 导入ProductZoomer 图片放大镜
import ProductZoomer from "vue-product-zoomer";
Vue.use(ProductZoomer);

// 把jq导入到main.js中 挂载到原型里面
import $ from "jquery";
Vue.prototype.$$ = $;

// 导入iview框架
import iView from "iview";
import "iview/dist/styles/iview.css";
// 注册到vue上
Vue.use(iView);

// 导入element-ui框架
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 注册到vue上
Vue.use(ElementUI);

// 导入axios
// 类似于vue-resource this.$http
import axios from "axios";
// 设置到vue的原型上 那么所有vue实例出来的对象和组件都能够共享这个属性
// 一般来说设置到原型上的属性vue中会使用$作为前缀用来区分普通的属性
Vue.prototype.$axios = axios;
// 使用axios的方式设置基础地址
axios.defaults.baseURL = "http://111.230.232.110:8899/";

// 导入路由
import VueRouter from "vue-router";
//如果是在模块化的开发环境下 需要导入Vue.use(VueRouter)
Vue.use(VueRouter);
// 导入 全局的样式
import "./assets/statics/site/css/style.css";

// 导入每一个页面的 组件
import index from "./components/index.vue";
import detail from "./components/02.detail.vue";
import shopCart from "./components/03.shopCart.vue";

//  定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  {
    path: "/",
    // 重定向到首页/index
    redirect: "/index"
  },
  {
    path: "/index",
    component: index
  },
  {
    path: "/detail/:id",
    component: detail
  },
  {
    path: "/shopCart",
    component: shopCart
  }
];

// 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
});

// 注册全局过滤器 方便使用
// 导入moment
import moment from "moment";
Vue.filter("shortTime", value => {
  return moment(value).format("YYYY-MM-DD");
});
Vue.filter("shortTimePlus", value => {
  return moment(value).format("YYYY-MM-DD HH:mm:ss");
});

// 导入Vuex
import Vuex from "vuex";
Vue.use(Vuex);
// 实例化仓库对象
const store = new Vuex.Store({
  // 状态
  state: {
    count: 0,
    // 购物车数据对象
    
    // let data = JSON.parse(window.localStorage.getItem('hm24'));
    // if (!data) {
    //   90: 10,
    //   80: 6
    // }下面代码扩写
    // 短路运算||如果没有数据 左边的值是false 去获取||右边的值
    cartData:JSON.parse(window.localStorage.getItem('hm24'))|| {
      90: 10,
      80: 6
    }
    // cartData:data
  },
  // Vuex的计算属性
  getters: {
    totalCount(state) {
      // 通过state获取内部的数据
      // 计算并返回
      // return 888;
      let num = 0;
      for (const key in state.cartData) {
        num += state.cartData[key];
      }
      return num;
    }
  },
  // 数据改变的方法
  mutations: {
    // 增加
    // state就是上面的数据state
    // 测试用的方法
    // increment (state,obj) {
    // console.log('触发了');
    // console.log(obj);
    // state.count+=n;
    // state.count+=m;
    // }
    // 往购物车添加数据的方法 2=>to
    // 约定对象的属性名 goodId(商品的id) goodNum(商品的个数)
    add2Cart(state, obj) {
      // console.log(obj);
      // 判断商品是否存在
      // 存在
      if (state.cartData[obj.goodId] != undefined) {
        state.cartData[obj.goodId] += obj.goodNum;
        // 上面代码的扩写
        // let oldNum = state.cartData[obj.goodId];
        // oldNum += obj.goodNum;
        // state.cartData[obj.goodId] =oldNum;
      } else {
        // 不存在
        // 动态增加键值对
        // state.cartData[obj.goodId] = obj.goodNum;
        // 如果是动态增加的属性 必须使用Vue.set才可以跟踪数据改变
        // 参数1 对象 参数2 对象 添加的属性名 参数3 属性的值
        Vue.set(state.cartData, obj.goodId, obj.goodNum);
      }
    }
  }
});

// 浏览器关闭保存数据
window.onbeforeunload = function () {
  window.localStorage.setItem('hm24',JSON.stringify(store.state.cartData))
}
// 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
  render: h => h(App),
  // 传入路有对象
  router,
  // 需要把store传递给Vue实例 这样在子组件才可以使用￥store
  store
}).$mount("#app");
