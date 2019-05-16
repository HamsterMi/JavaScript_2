"use strict";

const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class GoodsItem {
  constructor(title = "product", price = 0) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><img src="img/${this.title}.png" alt="${
      this.title
    }" width="400" height="400" class="goods-item__img"/> 
    <div class ="goods-item__text-wrap">
    <h3 class="goods-item__title">${this.title}</h3>
    <p class="goods-item__text">${this.price}</p></div></div>`;
  }
}

class GoodsList {
  constructor() {
  }
  fetchGoods() {
    return this.makeGETRequest(`${API_URL}/catalogData.json`).then(
      responseText => {
        this.goods = JSON.parse(responseText);
      }
    );
  }

  render() {
    let listHtml = "";
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }

  makeGETRequest(url) {
    return new Promise((resolve, reject) => {
      let xhr = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");

      xhr.open("GET", url, true);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status != 200) {
            let error = new Error(xhr.statusText);
            error.code = xhr.status;
            reject(error);
          } else {
            resolve(xhr.responseText);
          }
        }
      };

      xhr.send();
    });
  }
}

function init() {
  const list = new GoodsList();

  list.fetchGoods().then(
    () => {
      list.render();
    },
    error => alert(`${error}`)
  );
}
window.onload = init;
