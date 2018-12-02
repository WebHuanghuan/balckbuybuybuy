<template>
  <div class="shopCart">
    <div class="section">
      <div class="location">
        <span>当前位置：</span> <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!-- 购物车头部 -->
          <div class="cart-head clearfix">
            <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress"><span>1</span> 放进购物车</div>
                </li>
                <li>
                  <div class="progress"><span>2</span> 填写订单信息</div>
                </li>
                <li class="last">
                  <div class="progress"><span>3</span> 支付/确认订单</div>
                </li>
              </ul>
            </div>
          </div>
          <!-- 购物车头部 -->
          <!-- 商品列表 -->
          <div class="cart-box">
            <input
              id="jsondata"
              name="jsondata"
              type="hidden"
            />
            <table
              width="100%"
              align="center"
              class="cart-table"
              border="0"
              cellspacing="0"
              cellpadding="8"
            >
              <tbody>
                <tr>
                  <th
                    width="48"
                    align="center"
                  ><a>选择</a></th>
                  <th align="left">商品信息</th>
                  <th
                    width="84"
                    align="left"
                  >单价</th>
                  <th
                    width="104"
                    align="center"
                  >数量</th>
                  <th
                    width="104"
                    align="left"
                  >金额(元)</th>
                  <th
                    width="54"
                    align="center"
                  >操作</th>
                </tr>
                <!-- 有数据的提示内容 -->
                <tr v-for="(item, index) in goodsList" :key="item.id">
                  <td>
                    <el-switch
                      v-model="item.isSelected"
                      active-color="#13ce66"
                      inactive-color="9e9e9e"
                    >
                    </el-switch>
                  </td>
                  <td><img
                      :src="item.img_url"
                      alt=""
                    >
                    <span>
                      {{item.title}}
                    </span>
                  </td>
                  <td>{{item.sell_price}}</td>
                  <td>
                    <el-input-number
                      v-model="item.buycount"
                      :min="0"
                      size='mini'
                    >
                    </el-input-number>
                  </td>
                  <td>{{item.buycount*item.sell_price}}</td>
                  <td>
                    <!-- 删除按钮 -->
                    <el-button
                      @click='delOne(item.id)'
                      type='danger'
                      icon='el-icon-delete'
                      circle
                    ></el-button>
                  </td>
                </tr>
                <!-- 没有数据的提示内容 -->
                <tr v-show="goodsList.length == 0 ">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>
                          您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    align="right"
                    colspan="8"
                  >
                    已选择商品 <b
                      class="red"
                      id="totalQuantity"
                    >{{selectedCount}}</b> 件
                    &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b
                      class="red"
                      id="totalAmount"
                    >{{selectPrice}}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /商品列表 -->
          <!-- 购物车底部 -->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button
                class="button"
                onclick="javascript:location.href='/index.html';"
              >
                继续购物
              </button>
              <!-- 地址肯定不能写死
              声明式导航 地址现在的写法是固定的
                1.使用编程式导航 需要修改结构删除routelink 绑定点击事件
                2.selectedids
                  如果使用watch来实现
                    watch去观察goodlist deep
                    数据改变之后重新为selectedIds赋值
                    使用计算属性
                      只需要额外的增加一个计算属性即可 selectedids -->
              <router-link :to="'/order/'+selectedids">
                <button class="submit">
                  立即结算
                </button>
              </router-link>
            </div>
          </div>
          <!-- 购物车底部 -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "shopCart",
  data: function() {
    return {
      //   购物车商品数据
      goodsList: []
    };
  },
  //   方法
  methods: {
    delOne(id) {
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
    })
    .then(() => {
        // 删除数据
        // 删除当前这个组件中的数据
        this.goodsList.forEach((v,index)=> {        
          if(v.id==id) {
            this.goodsList.splice(index,1)
          }
        })
        // 删除Vuex中的数据
        // 因为watch会监控数据的改变 修改 删除 都会触发同步更新Vuex中的数据
        // this.$store.commit('delGoodsById',id);
        // 用户提示
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  // 计算属性
  computed: {
    //   选中的个数
    selectedCount() {
      let num = 0;
      this.goodsList.forEach(element => {
        //   如果被选中
        if (element.isSelected == true) {
          // 购买个数累加
          num += element.buycount;
        }
      });
      return num;
    },
    // 选中的总金额
    selectPrice() {
      let price = 0;
      this.goodsList.forEach(element => {
        if (element.isSelected == true) {
          price += element.buycount * element.sell_price;
        }
      });
      return price;
    },
    // 选中商品的id
    selectedids() {
      let ids = "";
      this.goodsList.forEach(v => {
        if (v.isSelected == true) {
          ids += v.id;
          ids += ",";
        }
      });
      // 去掉最后的逗号
      ids = ids.slice(0, ids.length - 1);
      // 返回ids
      return ids;
    }
  },
  // 生命周期函数
  created() {
    // 生成数据id1,id2,id3
    let ids = "";
    // 通过vuex获取数据
    for (const key in this.$store.state.cartData) {
      ids += key;
      ids += ",";
    }
    // 取消最后一个逗号
    // //console.log(ids.slice(0,ids.length-1));
    ids = ids.slice(0, ids.length - 1);
    // 调用接口
    this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(result => {
      // //console.log(result);
      // return;
      // 服务器返回的数据中是没有个数的 所以要自行拼接
      result.data.message.forEach(v => {
        v.buycount = this.$store.state.cartData[v.id];
        // 增加一个 是否被选择的字段 用来切换页面中的switch 开关
        v.isSelected = true;
      });
      // //console.log(result);
      this.goodsList = result.data.message;
    });
  },
  // 使用watch观察数据的改变
  watch: {
    goodsList: {
      // 引用类型 两次的值都是一样的
      handler: function(val, oldVal) {
        // //console.log(val);
        // //console.log(oldVal);

        let obj = {};
        val.forEach(v => {
          obj[v.id] = v.buycount;
        });
        // //console.log(obj);
        // 同步修改Vuex中的数据
        this.$store.commit("updateCartData", obj);
      },
      // 深度贯彻 内部的属性改变也会触发
      deep: true
    }
  }
};
</script>
<style>
td img {
  width: 100px;
}
td span {
  margin-left: 10px;
}
td:nth-child(2) {
  display: flex;
  align-items: center;
}
</style>

