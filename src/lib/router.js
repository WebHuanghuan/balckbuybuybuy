// 导入路由
import VueRouter from "vue-router";
// 导入Vue
import Vue from "vue";

//如果是在模块化的开发环境下 需要导入Vue.use(VueRouter)
Vue.use(VueRouter);

// 导入每一个页面的 组件
import index from "../components/index.vue";
import detail from "../components/02.detail.vue";
import shopCart from "../components/03.shopCart.vue";
import order from "../components/04.order.vue";
import login from "../components/05.login.vue";
import payMoney from "../components/06.payMoney.vue";
import paySuccess from "../components/07.paySuccess.vue";
import userCenter from "../components/08.userCenter.vue";
import orderList from "../components/09.orderList.vue";
import orderDetail from "../components/10.orderDetail.vue";
import orderIndex from "../components/11.orderIndex.vue";

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
  },
  {
    path: "/order/:ids",
    component: order,
    meta: { checkLogin: true }
  },
  {
    path: "/login",
    component: login
  },
  {
    path: "/paySuccess",
    component: paySuccess,
    meta: { checkLogin: true }
  },
  {
    path: "/payMoney/:orderId",
    component: payMoney,
    meta: { checkLogin: true }
  },
  {
    path: "/userCenter",
    component: userCenter,
    meta: { checkLogin: true },
    children: [
      {
        path: "",
        redirect: "orderIndex"
      },
      {
        path: "orderIndex",
        component: orderIndex
      },
      {
        path: "orderList",
        component: orderList
      },
      {
        path: "orderDetail/:orderId",
        component: orderDetail
      }
    ]
  }
];

// 实例化路由对象
let router = new VueRouter({
  routes,
  // 专门用来处理滚动的参数
  // 路由的 滚动行为中 的一个参数
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 };
  },
  // 去除#
  mode: "history"
});

// 增加导航守卫（回调函数 每次路由改变的时候触发）
router.beforeEach((to, from, next) => {
  // //console.log('触发守卫了');
  // //console.log(to);
  // //console.log(from);
  // if (to.path.indexOf('/order')!=-1) {
  if (to.meta.checkLogin == true) {
    // 正要去订单页
    // 必须先判断登录
    Vue.prototype.$axios.get("site/account/islogin").then(result => {
      //   //console.log(result);
      if (result.data.code == "nologin") {
        // 提示用户
        Vue.prototype.$Message.warning("请先登录");
        // 跳转页面（路由）登录页面 编程式导航
        router.push("/login");
      } else {
        // 如果登录成功
        next();
      }
    });
  } else {
    // next 如果不执行 就不会路由跳转
    next();
  }
});

// 暴露出去
export default router;
