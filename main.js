"use strict";

Vue.component("goods-list", {
  props: ["goods"],
  template: `
<div class="goods-list">
<goods-item v-for="good in goods" :good="good" :key=good.id></goods-item>
</div>`
});

Vue.component("goods-item", {
  props: ["good"],
  template: `
<div class="goods-item">
<div class="goods-item__wrap">
<h3 class="goods-item__title">{{good.product_name}}</h3>
<p class="goods-item__text">{{good.price}}</p>
<button class="add-button button" :id="good.id" @click="add">Добавить в корзину</button>
</div>
</div>
`,
  methods: {
    add() {
      app.addToCart(event.target.id);
    }
  }
});

Vue.component("cart", {
  props: ["visible", "goods"],
  template:
    '<div class="cart" v-if="visible"><slot name="product_name"></slot><cart-item v-for="good in goods" :key="good.id" :good="good"></cart-item></div>'
});
Vue.component("cart-item", {
  props: ["good"],
  template:
    '<div class="cart-item"><h3>{{good.product_name}}</h3><p>{{good.price}}</p><button class="button" :id="good.id" @click="remove(event)">x</button></div>',
  methods: {
    remove() {
      app.removeFromCart(event.target.id);
    }
  }
});

Vue.component("search-form", {
  data: () => ({
    searchLine: ""
  }),
  methods: {
    onSubmit() {
      this.$emit("submit", this.searchLine);
    }
  },
  template: `
  <form class="search-form" @submit.prevent="onSubmit">
  <input class="goods-search" type="text" v-model.trim="searchLine"/>
  <button class="search-button button" type="submit">
    Искать
  </button>
</form>`
});

const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    isVisibleCart: false,
    cart: []
  },
  methods: {
    makePOSTRequest(url, data) {
      return new Promise((resolve, reject) => {
        let xhr = window.XMLHttpRequest
          ? new XMLHttpRequest()
          : new ActiveXObject("Microsoft.XMLHTTP");

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.onreadystatechange = () => {
          if (xhr.readyState != 4) return;

          if (xhr.readyState === 4) {
            if (xhr.status != 200) {
              let error = new Error(xhr.statusText);
              error.code = xhr.status;
              reject(error.code);
            } else {
              resolve(JSON.parse(xhr.responseText));
            }
          }
        };

        xhr.send(JSON.stringify(data));
      });
    },
    makeGETRequest(url) {
      return new Promise((resolve, reject) => {
        let xhr = window.XMLHttpRequest
          ? new XMLHttpRequest()
          : new ActiveXObject("Microsoft.XMLHTTP");

        xhr.open("GET", url, true);
        xhr.onreadystatechange = () => {
          if (xhr.readyState != 4) return;

          if (xhr.readyState === 4) {
            if (xhr.status != 200) {
              let error = new Error(xhr.statusText);
              error.code = xhr.status;
              reject(error.code);
            } else {
              resolve(JSON.parse(xhr.responseText));
            }
          }
        };

        xhr.send();
      });
    },
    filterGoods(searchLine) {
      const REGEXP = new RegExp(searchLine, "i");
      this.filteredGoods = this.goods.filter(good =>
        REGEXP.test(good.product_name)
      );
      console.log(this.filteredGoods);
    },
    showCart() {
      this.isVisibleCart = this.isVisibleCart ? false : true;
    },
    addToCart(id) {
      let toCart;

      this.goods.forEach(function(good) {
        if (id == good.id) {
          toCart = {
            id: good.id,
            product_name: good.product_name,
            price: good.price
          };
        }
      });
      this.cart.push(toCart);
      this.makePOSTRequest("/addToCart", this.cart);
      console.log(this.cart);
    },
    removeFromCart(id) {
      let deletedId;
      this.cart.forEach(function(good, i) {
        if (id == good.id) {
          deletedId = i;
        }
      });
      this.cart.splice(deletedId, 1);
      this.makePOSTRequest("/updateCart", this.basketGoods);
    }
  },
  mounted() {
    this.makeGETRequest(`/catalogData`).then(goods => {
      this.goods = goods;
      this.filteredGoods = goods;
    });
  }
});
