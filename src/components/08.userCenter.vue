<template>
  <div class="el-row">
    <div class="el-col el-col-24">
      <div class="comp">
        <div class="tmpl routeanimate">
          <div class="section">
            <div class="location">
              <span>当前位置：</span>
              <a href="/index.html">首页</a> &gt;
              <a href="/user/center/index.html">会员中心</a>
            </div>
          </div>
          <div class="section clearfix">
            <div class="left-260">
              <div class="bg-wrap">
                <div class="avatar-box">
                  <a
                    href="/user/center/avatar.html"
                    class="img-box"
                  >
                    <!-- <i class="iconfont icon-user-full"></i> -->
                    <img
                      src="../assets/statics/site/img/header.png"
                      alt=""
                    >
                  </a>
                  <h3>

                    ivanyb

                  </h3>
                  <p>
                    <b>注册会员</b>
                  </p>
                </div>
                <div class="center-nav">
                  <ul>
                    <li>
                      <h2>
                        <i class="iconfont icon-order"></i>
                        <span>订单管理</span>
                      </h2>
                      <div class="list">
                        <p>
                          <!-- <a href="#/site/member/orderlist" class="">
                                                        <i class="iconfont icon-arrow-right"></i>交易订单</a> -->
                          <router-link to="/userCenter/orderList">
                            <i class="iconfont icon-arrow-right"></i>交易订单
                          </router-link>
                        </p>
                      </div>
                    </li>
                    <li>
                      <h2>
                        <i class="iconfont icon-user"></i>
                        <span>账户管理</span>
                      </h2>
                      <div class="list">
                        <p>
                          <a
                            href="#/site/member/center"
                            class="router-link-exact-active "
                          >
                            <i class="iconfont icon-arrow-right"></i>账户资料</a>
                        </p>
                        <p>
                          <a
                            href="#/site/member/center"
                            class="router-link-exact-active "
                          >
                            <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</a>
                        </p>
                        <p>
                          <a
                            href="#/site/member/center"
                            class="router-link-exact-active "
                          >
                            <i class="iconfont icon-arrow-right"></i>修改密码</a>
                        </p>
                        <p>
                          <a
                            href="javascript:void(0)"
                            @click='logout'
                          >
                            <i class="iconfont icon-arrow-right"></i>退出登录
                          </a>
                          <!-- 实现了跳转但是没有实现真正退出登录 不可用 -->
                          <!-- <router-link to="/index">
                                                      <i class="iconfont icon-arrow-right"></i>退出登录
                                                    </router-link> -->
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "userCenter",
  data: function() {
    return {};
  },
  methods: {
    logout() {
      this.$confirm("即将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //   调用登出接口即可
          this.$axios.get(`site/account/logout`).then(result => {
            // //console.log(result);
            if (result.data.status === 0) {
              this.$Message.success(result.data.message);
              // 编程式导航，去首页
              this.$router.push("/index");
              // 修改vuex中的登录字段为false
              this.$store.commit("changLogin", false);
            }
          });
          //   this.$message({
          //     type: 'success',
          //     message: '退出成功!'
          //   });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>
<style>
.avatar-box {
  height: auto;
}
.sub-tit {
  padding-top: 0;
}
</style>