"use strict";
export const goodsItem = Vue.component("goods-item", {
  props: ["good"],
  template: `
  <div class="goods-item">
  <div class="goods-item__wrap">
  <h3 class="goods-item__title">{{good.product_name}}</h3>
  <p class="goods-item__text">{{good.price}}</p>
  <button class="add-button button" :id="good.id" @click="addToCart">Добавить в корзину</button>
  </div>
  </div>
  `,
  methods: {
    addToCart() {
      this.$emit("add", this.good);
    }
  }
});
