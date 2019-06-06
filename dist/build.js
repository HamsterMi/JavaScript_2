!(function(t) {
  var e = {};
  function o(s) {
    if (e[s]) return e[s].exports;
    var r = (e[s] = { i: s, l: !1, exports: {} });
    return t[s].call(r.exports, r, r.exports, o), (r.l = !0), r.exports;
  }
  (o.m = t),
    (o.c = e),
    (o.d = function(t, e, s) {
      o.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: s });
    }),
    (o.r = function(t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (o.t = function(t, e) {
      if ((1 & e && (t = o(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var s = Object.create(null);
      if (
        (o.r(s),
        Object.defineProperty(s, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var r in t)
          o.d(
            s,
            r,
            function(e) {
              return t[e];
            }.bind(null, r)
          );
      return s;
    }),
    (o.n = function(t) {
      var e =
        t && t.__esModule
          ? function() {
              return t.default;
            }
          : function() {
              return t;
            };
      return o.d(e, "a", e), e;
    }),
    (o.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (o.p = ""),
    o((o.s = 0));
})([
  function(t, e, o) {
    "use strict";
    o.r(e);
    Vue.component("goods-list", {
      props: ["goods"],
      template:
        '\n<div class="goods-list">\n<goods-item v-for="good in goods" :good="good" @add="addToCart" ></goods-item>\n</div>',
      methods: {
        addToCart(t) {
          this.$emit("add", t);
        }
      }
    }),
      Vue.component("goods-item", {
        props: ["good"],
        template:
          '\n  <div class="goods-item">\n  <div class="goods-item__wrap">\n  <h3 class="goods-item__title">{{good.product_name}}</h3>\n  <p class="goods-item__text">{{good.price}}</p>\n  <button class="add-button button" :id="good.id" @click="addToCart">Добавить в корзину</button>\n  </div>\n  </div>\n  ',
        methods: {
          addToCart() {
            this.$emit("add", this.good);
          }
        }
      }),
      Vue.component("cart", {
        props: ["visible", "goods"],
        template:
          '<div class="cart" v-if="visible"><slot name="product_name"></slot><cart-item v-for="good in goods" :key="good.id" :good="good"></cart-item></div>'
      }),
      Vue.component("cart-item", {
        props: ["good"],
        template:
          '<div class="cart-item"><h3>{{good.product_name}}</h3><p>{{good.price}}</p><button class="button" :id="good.id" @click="remove(event)">x</button></div>',
        methods: {
          remove() {
            app.removeFromCart(event.target.id);
          }
        }
      }),
      Vue.component("search-form", {
        data: () => ({ searchLine: "" }),
        methods: {
          onSubmit() {
            this.$emit("submit", this.searchLine);
          }
        },
        template:
          '\n    <form class="search-form" @submit.prevent="onSubmit">\n    <input class="goods-search" type="text" v-model.trim="searchLine"/>\n    <button class="search-button button" type="submit">\n      Искать\n    </button>\n  </form>'
      }),
      new Vue({
        el: "#app",
        data: { goods: [], filteredGoods: [], isVisibleCart: !1, cart: [] },
        methods: {
          makePOSTRequest: (t, e) =>
            new Promise((o, s) => {
              let r = window.XMLHttpRequest
                ? new XMLHttpRequest()
                : new ActiveXObject("Microsoft.XMLHTTP");
              r.open("POST", t, !0),
                r.setRequestHeader(
                  "Content-Type",
                  "application/json; charset=UTF-8"
                ),
                (r.onreadystatechange = () => {
                  if (4 == r.readyState && 4 === r.readyState)
                    if (200 != r.status) {
                      let t = new Error(r.statusText);
                      (t.code = r.status), s(t.code);
                    } else o(JSON.parse(r.responseText));
                }),
                r.send(JSON.stringify(e));
            }),
          makeGETRequest: t =>
            new Promise((e, o) => {
              let s = window.XMLHttpRequest
                ? new XMLHttpRequest()
                : new ActiveXObject("Microsoft.XMLHTTP");
              s.open("GET", t, !0),
                (s.onreadystatechange = () => {
                  if (4 == s.readyState && 4 === s.readyState)
                    if (200 != s.status) {
                      let t = new Error(s.statusText);
                      (t.code = s.status), o(t.code);
                    } else e(JSON.parse(s.responseText));
                }),
                s.send();
            }),
          filterGoods(t) {
            const e = new RegExp(t, "i");
            (this.filteredGoods = this.goods.filter(t =>
              e.test(t.product_name)
            )),
              console.log(this.filteredGoods);
          },
          showCart() {
            this.isVisibleCart = !this.isVisibleCart;
          },
          addToCart(t) {
            let e;
            this.makePOSTRequest("/addToCart", t),
              this.goods.forEach(function(o) {
                o == t &&
                  (e = {
                    id: o.id,
                    product_name: o.product_name,
                    price: o.price
                  });
              }),
              this.cart.push(e),
              console.log(this.cart);
          },
          removeFromCart(t) {
            let e;
            this.cart.forEach(function(o, s) {
              t == o.id && (e = s);
            }),
              this.cart.splice(e, 1),
              this.makePOSTRequest("/updateCart", this.cart);
          }
        },
        mounted() {
          this.makeGETRequest("/catalogData").then(t => {
            (this.goods = t), (this.filteredGoods = t);
          });
        }
      });
  }
]);
