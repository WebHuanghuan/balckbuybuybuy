<template>
  <div class="login">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/login.html">会员登录</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit">
            <a
              class="selected"
              href="javascript:;"
            >账户登录</a>
            <i>|</i>
            <a href="/register.html">免费注册</a>
          </div>

          <div
            id="loginform"
            name="loginform"
            class="login-box"
          >
            <div class="input-box">
              <input
                id="txtUserName"
                name="txtUserName"
                type="text"
                placeholder="用户名/手机/邮箱"
                maxlength="50"
                v-model.trim="user_name"
              >
            </div>
            <div class="input-box">
              <input
                id="txtPassword"
                name="txtPassword"
                type="password"
                placeholder="输入登录密码"
                maxlength="16"
                v-model.trim="password"
              >
            </div>
            <div class="btn-box">
              <input
                id="btnSubmit"
                name="btnSubmit"
                type="submit"
                value="立即登录"
                @click="login"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data: function() {
    return {
      user_name: "",
      password: ""
    };
  },
  methods: {
    // 登录
    login() {
      // 非空判断
      if (this.user_name == "" || this.password == "") {
        this.$Message.warning("账号密码不能为空！");
      } else {
        // 调用接口
        this.$axios
          .post(`site/account/login`, {
            user_name: this.user_name,
            password: this.password
          })
          .then(result => {
            // console.log(result);
            // 登录成功
            if (result.data.status === 0) {
              this.$Message.success(result.data.message);
              // 修改Vuex中的登录字段
              this.$store.commit("changeLogin", true);
              // 从哪里来回哪里去
              this.$router.go(-1);
            } else {
              // 登录失败
              this.$Message.error(result.data.message);
            }
          });
      }
    }
  }
};
</script>
<style >

</style>
