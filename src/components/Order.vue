<template>
  <div class="order">
    <van-nav-bar title="点餐"></van-nav-bar>
    <van-row>
      <van-col span="6">
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item
            v-for="(order, index) in order_List"
            :key="index"
            :title="order"
          />
        </van-sidebar>
      </van-col>
      <van-col span="18" class="goods">
        <van-card
          v-for="(item, index) in currentCate"
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
          @submit="onSubmit"
          style="margin-bottom: 50px"
        />
      </van-col>
    </van-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name:"Order",
  data() {
    return {
      totalprice: 0,
      activeKey: 0,
      order_List: ["当季热销", "鲜果鲜茶", "现磨咖啡", "奶茶家族", "奶芙专场"],
      GoodList: {
        HotGoods: [
          {
            id: 0,
            imgPath: require("../assets/image/goodList/1.jpg"),
            price: "10.00",
            desc: "月售999",
            num: 0,
            title: "超大桶奶茶三兄弟",
          },
          {
            id: 1,
            imgPath: require("../assets/image/goodList/2.jpg"),
            price: "10.00",
            desc: "月售9",
            num: 0,
            title: "超大桶奶茶三兄弟",
          },
          {
            id: 2,
            imgPath: require("../assets/image/goodList/3.jpg"),
            price: "10.00",
            desc: "月售999",
            num: 0,
            title: "超大桶奶茶三兄弟",
          },
          {
            id: 3,
            imgPath: require("../assets/image/goodList/4.jpg"),
            price: "10.50",
            desc: "月售999",
            num: 0,
            title: "超大桶奶茶三兄弟",
          },
        ],
        FruitTea: [
          {
            id: 0,
            imgPath: require("../assets/image/goodList/1.jpg"),
            price: "10.00",
            desc: "月售999",
            num: 0,
            title: "超大桶奶茶三兄弟",
          },
        ],
        Coffee: [
          {
            id: 1,
            imgPath: require("../assets/image/goodList/2.jpg"),
            price: "10.00",
            desc: "月售999",
            num: 0,
            title: "超大桶奶茶三兄弟",
          },
        ],
        MilkTea: [
          {
            id: 2,
            imgPath: require("../assets/image/goodList/3.jpg"),
            price: "10.00",
            desc: "月售999",
            num: 0,
            title: "超大桶奶茶三兄弟",
          },
        ],
        MilkPuff: [
          {
            id: 3,
            imgPath: require("../assets/image/goodList/4.jpg"),
            price: "10.50",
            desc: "月售999",
            num: 0,
            title: "超大桶奶茶三兄弟",
          },
        ],
      },
      orderList: [],
      currentCate: "",
      username:''
    };
  },
  methods: {
    onChange(index) {
      const keys = Object.keys(this.GoodList);
      let currentkey = keys[index];
      this.currentCate = this.GoodList[currentkey];
    },
    changeNum(item, type) {
      if (type === "+") {
        item.num++;
        this.totalprice+=item.price*100
        axios
          .get("http://localhost:3000/order", {
            params: { imgPath: item.imgPath,username:this.username },
          })
          .then((data) => {
            if (data.data.length == 0) {
              delete item.id;
              item.username = this.username
              axios.post("http://localhost:3000/order", item);
            } else {
              let id = data.data[0].id;
              let newOrder = data.data[0];
              newOrder.num++;
              axios.put("http://localhost:3000/order/" + id, newOrder);
            }
          });
      } else if (item.num > 0) {
        item.num--;
        this.totalprice-=item.price*100
        axios
          .get("http://localhost:3000/order", {
            params: { imgPath: item.imgPath },
          })
          .then((data) => {
            let id = data.data[0].id;
            let newOrder = data.data[0];
            newOrder.num--;
            if (newOrder.num) {
              axios.put("http://localhost:3000/order/" + id, newOrder);
            } else {
              axios.delete("http://localhost:3000/order/" + id);
            }
          });
      }
    },
    onSubmit(){
      console.log(123);
      this.$router.push('/cart')
    }
  },
  created() {
    this.currentCate = this.GoodList.HotGoods;
    this.username = this.$store.state.username
  }
};
</script>

<style>
.goods {
  height: 460px;
  overflow: auto;
}
</style>