"use strict";
export const cartItem = Vue.component("cart-item", {
  props: ["good"],
  template:
    '<div class="cart-item"><h3>{{good.product_name}}</h3><p>{{good.price}}</p><button class="button" :id="good.id" @click="remove(event)">x</button></div>',
  methods: {
    remove() {
      app.removeFromCart(event.target.id);
    }
  }
});
