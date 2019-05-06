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

//добавлены по умолчанию аргументы для функции renderGoodsItem
const renderGoodsItem = (title = "product", price = 0) =>
  `<div class="goods-item"><img src="img/${title}.png" alt="${title}" width="400" height="400" class="goods-item__img"/> 
  <div class ="goods-item__text-wrap">
  <h3 class="goods-item__title">${title}</h3>
  <p class="goods-item__text">${price}</p></div></div>`;

//добавлен по умолчанию аргумент для функции renderGoodsList
const renderGoodsList = (list = GOODS) => {
  const goodsList = list.map(item => renderGoodsItem(item.title, item.price));
  document.querySelector(".goods-list").innerHTML = goodsList.join(" ");
};
const goodsList = renderGoodsList();

/*  упростить код можно так: 
const renderGoodsList = (list = GOODS) => {
  document.querySelector(".goods-list").innerHTML = list.map(item => renderGoodsItem(item.title, item.price)).join(" ");
}; */
//но это вопросы вкуса и привычки, я полагаю

// Вопрос  №3. Сейчас после каждого товара на странице выводится запятая. Из-за чего это происходит?Как это исправить?
// После каждого товара выводилась запятая, поскольку метод map() возвращяет массив и страндартный разделитель массива - запятая*/
// Метод join() позволяет преобразовать массив в строкуи указать разделитель. Я использовала "пробел".
