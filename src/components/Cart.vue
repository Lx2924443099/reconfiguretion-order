<template>
  <div class="cart">
    <div class="orderList">
      <van-nav-bar title="购物车"></van-nav-bar>
      <p v-show="!orderList.length">还没有商品哦，快去选购吧！</p>
      <div v-show="orderList.length">
        <van-card
          v-for="(item, index) in orderList"
          :key="index"
          :num="item.num"
          :price="item.price"
          :desc="item.desc"
          :title="item.title"
          :thumb="item.imgPath"
        >
          <template #footer>
            <van-button size="mini" @click="changeNum(item, '-')">-</van-button>
            <van-button size="mini" @click="changeNum(item, '+')">+</van-button>
          </template>
        </van-card>

        <van-submit-bar
          :price="totalprice"
          button-text="提交订单"
          tip-icon="info-o"
          style="margin-bottom: 50px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      totalprice: 0,
      orderList: [],
      username: "",
    };
  },
  methods: {
    changeNum(item, type) {
      if (type === "+") {
        item.num++;
        this.totalprice += item.price * 100;
        axios
          .get("http://localhost:3000/order", {
            params: { imgPath: item.imgPath },
          })
          .then((data) => {
            let id = data.data[0].id;
            let newOrder = data.data[0];
            newOrder.num++;
            axios.put("http://localhost:3000/order/" + id, newOrder);
          });
      } else if (item.num > 0) {
        item.num--;
        this.totalprice -= item.price * 100;
        axios
          .get("http://localhost:3000/order", {
            params: { imgPath: item.imgPath, username: this.username },
          })
          .then((data) => {
            let id = data.data[0].id;
            let newOrder = data.data[0];
            newOrder.num--;
            if (newOrder.num) {
              axios
                .put("http://localhost:3000/order/" + id, newOrder)
            } else {
              axios.delete("http://localhost:3000/order/" + id)
              this.getOrderList()
            }
          });
      }
    },
    getOrderList() {
      this.totalprice = 0
      axios
        .get("http://localhost:3000/order", {
          params: { username: this.username },
        })
        .then((data) => {
          this.orderList = data.data;
          this.orderList.forEach((item) => {
            this.totalprice += item.price * item.num * 100;
          });
        });
    },
  },
  created() {
    this.username = this.$store.state.username;
  },
  mounted() {
    this.getOrderList();
  },
};
</script>

<style>
</style>