import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      console.log("Count incremented:", this.count);
      this.count++; // 方法中的 state 參數是不必要的，而且這樣會破壞 Pinia 的設計模式。
    },
  },
});
