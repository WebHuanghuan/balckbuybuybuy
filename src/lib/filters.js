// 注册全局过滤器 方便使用
// 导入Vue
import Vue from "vue";

// 导入moment
import moment from "moment";
Vue.filter("shortTime", value => {
  return moment(value).format("YYYY-MM-DD");
});
Vue.filter("shortTimePlus", value => {
  return moment(value).format("YYYY-MM-DD HH:mm:ss");
});
