"use strict";
export const app = new Vue({
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
      addToCart(good) {
        this.makePOSTRequest("/addToCart", good);
  
        let toCart;
  
        this.goods.forEach(function(item) {
          if (item == good) {
            toCart = {
              id: item.id,
              product_name: item.product_name,
              price: item.price
            };
          }
        });
        this.cart.push(toCart);
  
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
        this.makePOSTRequest("/updateCart", this.cart);
      }
    },
    mounted() {
      this.makeGETRequest(`/catalogData`).then(goods => {
        this.goods = goods;
        this.filteredGoods = goods;
      });
    }
  });
  