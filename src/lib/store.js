// 导入Vuex
import Vuex from "vuex";
Vue.use(Vuex);
// 导入Vue
import Vue from "vue";

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
    cartData: JSON.parse(window.localStorage.getItem("hm24")) || {
      90: 10,
      80: 6
    },
    // cartData:data,
    // 是否登录的字段
    isLogin: false
  },
  // Vuex的计算属性
  getters: {
    totalCount(state) {
      // //console.log(state);
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
    // //console.log('触发了');
    // //console.log(obj);
    // state.count+=n;
    // state.count+=m;
    // }
    // 往购物车添加数据的方法 2=>to
    // 约定对象的属性名 goodId(商品的id) goodNum(商品的个数)
    add2Cart(state, obj) {
      // //console.log(obj);
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
      // 打印内容
      // //console.log(state);
    },
    updateCartData(state, obj) {
      // //console.log(obj);
      // 接收到数据直接赋值 因为在03.shopCart.vue 已经把数据处理好了
      // 直接赋值
      state.cartData = obj;
    },
    // 删除某一条数据的方法
    // 已经被watch中的代码实现,只是为了演示Vue.delete这个方法
    delGoodsById(state, id) {
      // //console.log(id);
      // 根据id删除state中的数据
      // delete state.cartData[id];
      // delete 删除的属性 vue无法跟踪
      // 参数1 对象 参数2 删除的属性
      // 必须使用vue.delete才可以同步更新视图
      Vue.delete(state.cartData, id);
    },
    changeLogin(state, isLogin) {
      state.isLogin = isLogin;
    }
  }
});

export default store;
