"use strict";

const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: "",
    isVisibleCart: false,
    
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
    filterGoods() {
      const REGEXP = new RegExp(this.searchLine, "i");
      this.filteredGoods = this.goods.filter(good =>
        REGEXP.test(good.product_name)
      );
    },
    showCart() {
      this.isVisibleCart = this.isVisibleCart ? false : true;
    }
  },
  mounted() {
    this.makeGETRequest(` ${API_URL}/catalogData.json`).then(goods => {
      this.goods = goods;
      this.filteredGoods =
        this.filteredGoods.lenght > 0 ? this.filteredGoods : goods;
    });
  }
});
