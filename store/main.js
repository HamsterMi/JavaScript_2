"use strict";

const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class GoodsItem {
  constructor(id, title = "product", price = 0) {
    this.title = title;
    this.price = price;
    this.id = id;
  }
  //Вариант на лекции
  render() {
    return `<div class="goods-item"><img src="img/${this.title}.png" alt="${
      this.title
    }
    "width="400" height="400" class="goods-item__img"/> 
    <div class ="goods-item__wrap">
    <h3 class="goods-item__title">${this.title}</h3>
    <button data-id="${
      this.id
    }" class="add-button button" >Добавить в корзину</button>
    <p class="goods-item__text">${this.price}</p></div></div>`;
  }
}

class GoodsList {
  constructor() {
    /* this.goods = []; */
    this.filteredGoods = [];
  }
  fetchGoods() {
    return this.makeGETRequest(`${API_URL}/catalogData.json`).then(
      responseText => {
        this.goods = JSON.parse(responseText);
        this.filteredGoods = JSON.parse(responseText);
      }
    );
  }

  render(cart) {
    let listHtml = "";
    this.filteredGoods.forEach(good => {
      const goodItem = new GoodsItem(
        good.id_product,
        good.product_name,
        good.price
      );
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
    this.addEvents(cart);
  }

  addEvents(cart) {
    const buttons = [...document.querySelectorAll(".add-button")];
    buttons.forEach(button => {
      button.addEventListener("click", e => {
        e.preventDefault();
        const id = e.target.getAttribute("data-id");
        const product = this.goods.find(item => item.id_product == id);
        cart.add(product);
      });
    });
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

  filterGoods(value) {
    const REGEXP = new RegExp(value, "i");
    this.filteredGoods = this.goods.filter(good =>
      REGEXP.test(good.product_name)
    );
    this.render();
  }
}

class Cart extends GoodsList {
 
  add(product) {
    this.makeGETRequest(`${API_URL}/addToBasket.json`)
      .then(() => {
        console.log(product);
      })
      .catch(err => console.error(error));
  }

  //попоробовать отработать обновление корзины
  update(index, newCount) {
    //в update поставить промис, который будет ждать, когда добавится продукт?!
    this.goods[index].setCount(newCount);
  }

  remove(index) {
    this.goods.splice(index, 1);
  }
}

//элемент корзины
class CartItem extends GoodsItem {
  constructor() {
    super();
    let count = 1;
  }

  getCount() {
    return count;
  }

  setCount(newCount) {
    count = newCount;
  }
}

function init() {
  const LIST = new GoodsList();
  const CART = new Cart();

  LIST.fetchGoods().then(
    () => {
      LIST.render(CART);
    },
    error => alert(`${error}`)
  );

  const SEARCH_FORM = document.querySelector(".search-form");
  const SEARCH_INPUT = document.querySelector(".goods-search");
  SEARCH_FORM.addEventListener("submit", e => {
    e.preventDefault();
    const VALUE = SEARCH_INPUT.value;
    LIST.filterGoods(VALUE);
  });
}
window.onload = init;
