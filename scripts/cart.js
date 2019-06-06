"use strict";
export const cart = Vue.component("cart", {
  props: ["visible", "goods"],
  template:
    '<div class="cart" v-if="visible"><slot name="product_name"></slot><cart-item v-for="good in goods" :key="good.id" :good="good"></cart-item></div>'
});

