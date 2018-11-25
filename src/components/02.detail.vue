<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box" v-for="(item, index) in imglist" :key="item.id">

                <!-- <img :src=" item.original_path" alt=""> -->
              </div>
              <div class="goods-spec">
                <h1>{{ goodsinfo.title }}</h1>
                <p class="subtitle">{{ goodsinfo.sub_title }}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{ goodsinfo.goods_no }}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{ goodsinfo.market_price }}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">¥{{ goodsinfo.sell_price }}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <el-input-number v-model="buyCount" :min="1" :max=" goodsinfo.stock_quantity "></el-input-number>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{ goodsinfo.stock_quantity }}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <!-- 使用iView组件里的 图钉 吸附顶部 -->
              <Affix>
                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                  <ul>
                    <li>
                      <a href="javascript:;" @click="tabIndex=0" :class="{selected:tabIndex==0}">商品介绍</a>
                    </li>
                    <li>
                      <a href="javascript:;" @click="tabIndex=1" :class="{selected:tabIndex==1}">商品评论</a>
                    </li>
                  </ul>
                </div>
              </Affix>
              <!-- 渲染为html结构 -->
              <div class="tab-content entry" v-show="tabIndex==0" v-html="goodsinfo.content">

              </div>
              <div class="tab-content" v-show="tabIndex==1">
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea v-model.trim="comment" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon"> 
                        <input @click="submitComment" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p v-show="totalcount==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                    <li v-for="(item, index) in comments" :key="item.id">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{ item.user_name }}</span>
                          <span>{{ item.reply_time | shortTimePlus }}</span>
                        </div>
                        <p>{{ item.content }}</p>
                      </div>
                    </li>

                  </ul>
                  <div class="page-box" style="margin: 5px 0px 0px 62px;">
                    <div id="pagination" class="digg">
                      <!-- 使用iView的分页组件 -->
                      <Page :current='pageIndex' @on-change='pageChange' :total="totalcount" show-sizer show-elevator placement='top' :page-size-opts='[15, 30, 45, 60]' :page-size='pageSize' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="(item, index) in hotgoodslist" :key="item.id">
                    <div class="img-box">
                      <!-- <a href="#/site/goodsinfo/90" class=""> -->
                      <router-link :to="'/detail/'+item.id">
                        <img :src="item.img_url">
                      </router-link>
                      <!-- </a> -->

                    </div>
                    <div class="txt-box">
                      <!-- <a href="#/site/goodsinfo/90" class=""> -->
                      <router-link :to="'/detail/'+item.id">
                        {{ item.title }}
                      </router-link>
                      <!-- </a> -->
                      <span>{{ item.add_time | shortTime}}</span>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
// 导入jquery插件
import $ from "jquery";
// 暴露出去
export default {
  name: "detail",
  //   生命周期函数
  data() {
    return {
      artID: "",
      // 商品详情
      goodsinfo: [],
      // 图片列表
      imglist: [],
      // 热门推荐
      hotgoodslist: [],
      // 购买数量
      buyCount: 1,
      // 记录点击的tab栏索引
      tabIndex: 0,
      // 页码
      pageIndex: 1,
      // 页容量
      pageSize: 10,
      // 评论内容
      comments: [],
      // 总评论数
      totalcount: 0,
      // 发表评论
      comment: ""
    };
  },
  // 事件
  methods: {
    // 初始化数据
    initData() {
      // 初始化购买个数
      this.buyCount = 1;
      // 保存数据
      this.artID = this.$route.params.id;
      // console.log(this.artID);

      // 调用接口 获取详情数据 axios
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.artID}`
        )
        .then(result => {
          // handle success
          // console.log(result);
          // 热门推荐
          this.hotgoodslist = result.data.message.hotgoodslist;
          // 商品详情
          this.goodsinfo = result.data.message.goodsinfo;
          // 图片列表
          this.imglist = result.data.message.imglist;
        });
      // 调用获取评论的方法
      this.getComments();
    },
    // 获取评论数据
    getComments(pageIndex) {
      // 调用接口 获取商品评论数据 axios
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${
            this.artID
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(result => {
          // handle success
          // console.log(result);
          this.comments = result.data.message;
          this.totalcount = result.data.totalcount;
        });
    },
    // 页码改变
    pageChange(pageIndex) {
      // console.log(pageIndex);
      this.pageIndex = pageIndex;
      this.getComments();
    },
    // 评论内容
    submitComment() {     
      //非空判断
      if (this.comment == "") {
        // 提示
        this.$Message.warning("输入内容不能为空!");
        // return;
      } else {
        // 调用接口 获取提交评论数据 axios
        this.$axios
          .post(`site/validate/comment/post/goods/${this.artID}`, {
            commenttxt: this.comment
          })
          .then(result => {
            console.log(result);
            // 判断是非成功
            if (result.data.status == 0) {
              // 提示用户
              this.$Message.success(result.data.message);
              // 清空文本框的内容
              this.comment = "";
              // 初始化页面为1才能看到自己的评论
              this.pageIndex = 1;
              // 重新获取评论信息
              this.getComments();
            } else {

            }
          });
      }
    }
  },
  // 生命周期函数
  created() {
    console.log(this.$route.params);
    this.initData();
  },
  // 侦听器
  watch: {
    $route(newVal, oldVal) {
      // 初始化数据
      this.initData();
    }
  }
};
</script>

<style>
.tab-content img {
  display: block;
  width: 100%;
}
</style>