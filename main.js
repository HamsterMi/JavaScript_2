"use strict";

const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

Vue.component("goods-list", {
  props: ["goods"],
  template: `
<div class="goods-list">
<goods-item v-for="good in goods" :good="good" :key=good.id_product></goods-item>
</div>`
});

Vue.component("goods-item", {
  props: ["good"],
  template: `
<div class="goods-item">
<div class="goods-item__wrap">
<h3 class="goods-item__title">{{good.product_name}}</h3>
<p class="goods-item__text">{{good.price}}</p>
</div>
</div>
`
});

Vue.component("cart", {
  props: ["visible"],
  template: `
  <div class="cart" v-if="visible">
              Ваша корзина еще пуста
            </div>`
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
    isVisibleCart: false
  },
  methods: {
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
    }
  },
  mounted() {
    this.makeGETRequest(` ${API_URL}/catalogData.json`).then(goods => {
      this.goods = goods;
      this.filteredGoods = goods;
    });
  }
});
