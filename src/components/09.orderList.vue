<template>
  <div class="right-auto orderList">
    <div
      class="bg-wrap"
      style="min-height: 765px;"
    >
      <div class="sub-tit">
        <ul>
          <li class="selected">
            <a href="/user/order-list.html">交易订单</a>
          </li>
        </ul>
      </div>
      <div class="table-wrap">
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          class="ftable"
        >
          <tbody>
            <tr>
              <th
                width="16%"
                align="left"
              >订单号</th>
              <th width="10%">姓名</th>
              <th width="12%">订单金额</th>
              <th width="11%">下单时间</th>
              <th width="10%">状态</th>
              <th width="12%">操作</th>
            </tr>
            <tr
              v-for="(item, index) in orderList"
              :key="item.id"
            >
              <td>{{item.order_no}}</td>
              <td align="left">{{item.accept_name}}</td>
              <td align="left">
                <strong style="color: red;">￥{{item.order_amount}}</strong>
                <br> {{item.paymentTitle}}
              </td>
              <td align="left">{{item.express_time | shortTimePlus}}</td>
              <td align="left">
                {{item.statusName}}
              </td>
              <td align="left">
                <!-- <a
                  href="#/site/member/orderinfo/12"
                  class=""
                >查看订单</a> -->
                <router-link :to="`/userCenter/orderDetail/`+item.id">查看订单</router-link>
                <br>
                <!-- <a
                  href="#/site/goods/payment/12"
                  class=""
                >|去付款</a> -->
                <router-link v-show="item.status==1":to="`/payMoney/`+item.id">去付款</router-link>
                <br>
                <!-- <a href="javascript:void(0)">|取消</a>
                <br> -->
              </td>
            </tr>
          </tbody>
        </table>
        <div class="page-foot">
          <el-pagination
            background
            @size-change="pageSizeChange"
            @current-change="pageIndexChange"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalcount"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "orderDetail",
  data: function() {
    return {
      pageIndex: 1,
      pageSize: 10,
      totalcount: 0,
      orderList: []
    };
  },
  methods: {
    pageSizeChange(pageSize) {
      // //console.log(`每页: ${pageSize} 条`);
      this.pageSize = pageSize;
       this.pageIndex = 1;
      this.getOrderList();
    },
    pageIndexChange(pageIndex) {
      // //console.log(`当前页: ${pageIndex}`);
      this.pageIndex = pageIndex;
     
      this.getOrderList();
    },
    getOrderList() {
      this.$axios
        .get(
          `site/validate/order/userorderlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(result => {
          // //console.log(result);
          this.orderList = result.data.message;
          this.totalcount = result.data.totalcount;
        });
    }
  },

  created() {
    this.getOrderList();
  }
};
</script>
<style>
</style>
