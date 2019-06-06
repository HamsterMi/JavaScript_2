"use strict";
export const searchForm = Vue.component("search-form", {
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