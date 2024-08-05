import { defineStore } from "pinia";

interface User {
  id: number;
  name: string;
}

// 定義 state 的類型
interface UserState {
  users: User[]; // User[] 包含空陣列的情況。
  currentUser: User | null;
}

// 泛型用於指定 store 的結構和類型，這樣可以在創建 store 時就確保其一致性和正確性。
export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    users: [
      {
        id: 22,
        name: "vicky",
      },
    ],
    currentUser: null,
  }),
  actions: {
    addUser(user: User) {
      this.users.push(user);
    },
    setCurrentUser(user: User) {
      this.currentUser = user;
    },
  },
});
