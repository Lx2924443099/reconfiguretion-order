<template>
  <div class="selectAddress">
    <van-nav-bar
      title="选择地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="show = true"
      @select="subAddress"
    />
    <span v-show="!list.length"> 还没有地址哦！ </span>
    <van-dialog v-model="show" title="添加地址">
      <van-address-edit
        :area-list="areaList"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      />
    </van-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { areaList } from "@vant/area-data";
export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [],
      show: false,
      areaList,
      newAddress: {},
      choseAdd: false,
    };
  },
  methods: {
    subAddress(){
      let id = this.chosenAddressId*1-1
      let address = this.list[id]
      this.$store.state.address = address
      this.$router.push('/order')
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onSave(content) {
      let address =
        content.province +
        content.city +
        content.county +
        content.addressDetail;
      this.newAddress = {
        username: this.$store.state.username,
        name: content.name,
        tel: content.tel,
        idDefault: false,
        address: address,
      };
      axios.post("http://localhost:3000/address", this.newAddress).then(() => {
        this.getAddressList();
        this.show = false;
        this.choseAdd = false;
      });
    },
    getAddressList() {
      let username = this.$store.state.username;
      axios
        .get("http://localhost:3000/address", {
          params: {
            username: username,
          },
        })
        .then((data) => {
          this.list = data.data;
        });
    },
  },
  mounted() {
    this.getAddressList();
  },
};
</script>

<style>
</style>