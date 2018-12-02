import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// 导入 全局的样式
import "./assets/statics/site/css/style.css";
// 导入路由
import router from "./lib/router";
// 导入仓库
import store from "./lib/store";
// 导入过滤器
import "./lib/filters";
// 导入插件
import "./lib/plugins";

// 浏览器关闭保存数据
window.onbeforeunload = function() {
  window.localStorage.setItem("hm24", JSON.stringify(store.state.cartData));
};
// 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
  render: h => h(App),
  // 传入路有对象
  router,
  // 需要把store传递给Vue实例 这样在子组件才可以使用￥store
  store,
  // 生命周期函数
  created() {
    // //console.log('最顶级的被创建了');
    // 调用登录判断接口
    // 根据结果判断是否登录
    this.$axios.get("site/account/islogin").then(result => {
      // //console.log(result);
      if (result.data.code == "nologin") {
        // 提示用户
        Vue.prototype.$Message.warning("请先登录");
        // 跳转页面(路由) 登录页面 编程式导航
        router.push("/login");
      } else {
        // 修改仓库中的状态
        store.state.isLogin = true;
        // 如果登录成功啦
        // next();
      }
    });
  }
}).$mount("#app");
