// 导入Vue
import Vue from "vue";

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
// import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 注册到vue上
// Vue.use(ElementUI);
// 按需导入
import { InputNumber,
    Input,
    Carousel,
    CarouselItem,
    Notification,
    Button,
    Switch,
    MessageBox,
    Form,
    FormItem,
    Radio,
    Pagination,
    Message,
 } from 'element-ui';

Vue.use(InputNumber);
Vue.use(Input);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Button);
Vue.use(Switch);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Radio);
Vue.use(Pagination);
// 挂载到原型上
Vue.prototype.$notify = Notification;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

// 导入axios
// 类似于vue-resource this.$http
import axios from "axios";
// 设置到vue的原型上 那么所有vue实例出来的对象和组件都能够共享这个属性
// 一般来说设置到原型上的属性vue中会使用$作为前缀用来区分普通的属性
Vue.prototype.$axios = axios;

/* // 设置带上cookie */
axios.defaults.withCredentials = true; //让ajax携带cookie

// 使用axios的方式设置基础地址
axios.defaults.baseURL = "http://111.230.232.110:8899/";
