"use strict";
export const goodsList = Vue.component("goods-list", {
  props: ["goods"],
  template: `
<div class="goods-list">
<goods-item v-for="good in goods" :good="good" @add="addToCart" ></goods-item>
</div>`,
  methods: {
    addToCart(goods) {
      this.$emit("add", goods);
    }
  }
});
