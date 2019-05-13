"use strict";
function init() {
  const CAFE = new Cafe();
  CAFE.render();

  const HAMBURGER = new Hamburger();
  HAMBURGER.render();

  /* HAMBURGER.calculateCalories(); */
}

window.onload = init;

const BREAD = [
  { title: "Большой", price: 100, calories: 40 },
  { title: "Маленький", price: 50, calories: 20 }
];

const STUFFING = [
  { title: "Говядина", price: 60, calories: 30 },
  { title: "Курица", price: 50, calories: 25 },
  { title: "Рыба", price: 40, calories: 25 },
  { title: "Сыр", price: 10, calories: 20 },
  { title: "Салат", price: 20, calories: 5 },
  { title: "Картофель", price: 15, calories: 10 },
  { title: "Помидор", price: 20, calories: 5 }
];

const SAUCES = [
  { title: "Приправа", price: 15, calories: 0 },
  { title: "Майонез", price: 20, calories: 5 },
  { title: "Горчица", price: 10, calories: 3 }
];

class Hamburger {
  constructor() {
    /* this.size = document.querySelector("input[class='size_radio']:checked"); */
    /* this.stuffing = [];
    this.sauces = []; */
  }
  render() {
    let countButton = document.querySelector(".button-count");
    countButton.addEventListener("click", this.calculate);
  }
  calculate() {
    //рассчитываем булку
    let breadItem = document.querySelector("input[class='size_radio']:checked");
    let breadPrice = "";
    let breadCalories = "";
    BREAD.forEach(item => {
      if (item.title == breadItem.value) {
        breadPrice = item.price;
        breadCalories = item.calories;
      }
    });

    //рассчитываем начинки
    let stuffingItems = document.querySelectorAll(
      "input[class='stuffing-checkbox']:checked"
    );
    let stuffingPrice = 0;
    let stuffingCalories = 0;
    stuffingItems.forEach(stuf => {
      STUFFING.forEach(item => {
        if (item.title == stuf.value) {
          stuffingPrice += item.price;
          stuffingCalories += item.calories;
        }
      });
    });

    //рассчитываем coусы
    let saucesItems = document.querySelectorAll(
      "input[class='sauces-checkbox']:checked"
    );

    let saucePrice = 0;
    let sauceCalories = 0;
    saucesItems.forEach(sauce => {
      SAUCES.forEach(item => {
        if (item.title == sauce.value) {
          saucePrice += item.price;
          sauceCalories += item.calories;
        }
      });
    });

    let totalPrice = breadPrice + stuffingPrice + saucePrice;
    let totalCalories = breadCalories + stuffingCalories + sauceCalories;

    document.querySelector(".price-text").innerHTML += totalPrice;
    document.querySelector(".calories-text").innerHTML += totalCalories;
  }
  calculateCalories() {}
}

class Cafe {
  constructor(hamburger) {
    this.makeOrder = this.makeOrder.bind(this);
  }
  render() {
    let startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", this.makeOrder);
  }
  makeOrder() {
    event.target.style.display = "none";
    document.querySelector(".burger-form").style.display = "flex";
    document.querySelector(".total").style.display = "flex";
  }
}
