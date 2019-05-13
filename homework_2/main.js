"use strict";

const GOODS = [
  { title: "Shirt", price: 150 },
  { title: "Socks", price: 50 },
  { title: "Jacket", price: 350 },
  { title: "Shoes", price: 250 },
  {},
  {},
  {},
  {}
];

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
    this.goods = [];
  }
  // заполнение списка товаров
  fetchGoods() {
    this.goods = GOODS;
  }
  //вывод списка товаров
  render() {
    let listHtml = "";
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }

  countSumm() {
    let summArr = 0;
    this.goods.forEach(good => {
      good.price = good.price ? good.price : 0;
      summArr += good.price;
    });

    document.querySelector(".total-price").innerHTML = `Cуммарная стоимость: ${summArr}$`;
    console.log(`Cуммарная стоимость "${summArr}$"`);
  }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.countSumm();

//список корзины
class GoodsBasket {
  constructor() {}

  //посчитать количеcтво товаров в корзине
  countQuantity() {}

  //посчитать цену товаров
  countSumm() {}

  //очистить корзину
  clearBasket() {}

  //оформить заказ()
  makeOrder() {}
}

//элемент корзины
class GoodsBasketItem {
  constructor() {}

  //добавить в корзину товар
  addItems() {}

  //изменить количество товара
  changeQuantity() {}

  //удалить товар из корзины
  deleteItem() {}

  //посчитать итоговую цену товара(с учетом количества)
  countSumm() {}
}
