<script>
import { defineComponent, computed, inject } from 'vue'; //ref, watch
import { useUserStore } from '@/stores/userStore'

export default defineComponent({
  name: "PraStore",
  setup() {
    const userStore = useUserStore();
    // TODO: 純使用 ref: 優點=> 可以避免每次模板更新時都重新計算 userStore.users,  缺點=> 不即時，需搭配 watch
    // const users = ref(userStore.users);
    // const currentUser = ref(userStore.currentUser);



    // TODO : 使用 watch，缺點=> 會增加一些額外的監聽及複雜度，這可能會影響性能，特別是在大型應用中。
    // watch(() => userStore.currentUser, (newUsers) => {
    //   currentUser.value = newUsers;
    // }, { deep: true });



    // TODO: ref 用於創建一個響應式的引用，但當你使用它來初始化靜態值時，它不會  {跟蹤原始來源}  的變化。
    // TODO: toRefs 可以將 reactive 對象的屬性轉換為響應式的 ref，從而保持模板和狀態的一致性。缺點=> toRefs 在某些情況下可能會導致性能問題，特別是當有大量的響應式數據時。
    // const { users, currentUser } = toRefs(userStore); // 即時



    // TODO: toRefs vs useRef
    // TODO: toRefs 主要用於保持 Vue 的響應式狀態，使得模板中的數據能夠即時反映狀態變化。
    // TODO: useRef 用於存儲對象或 DOM 元素引用，以便進行直接操作 or 存儲不會引起渲染的值。



    const addUser = () => {
      const newUser = { id: Date.now(), name: 'New User' }
      userStore.addUser(newUser)
    }

    const setCurrentUser = () => {
      const user = userStore.users[0]
      if (user) {
        userStore.setCurrentUser(user)
      }
    }
    // =======================================================

    const injectedValue = inject('providedValue');
    const providedFunction = inject('providedFunction');

    // TODO: 如果直接 return providedFunction 有缺點：不易擴展：如果將來需要在調用函數前後添加邏輯，需要修改模板或進行其他改動。
    const callProvidedFunction = () => {
      providedFunction('Hello from Child');
    };

    return {
      // TODO: 優點=> 即時;  缺點=> 性能考量：模板中每次訪問 userStore 都會重新計算，可能會在大型應用中影響性能
      // userStore, 

      // TODO: 優點=> 即時;  缺點=> 不即時
      // users: userStore.users,
      // currentUser: userStore.currentUser,


      // TODO: 最推: 屬性只有在依賴的數據變化時才會重新計算，這樣可以提高性能。
      users: computed(() => userStore.users),
      currentUser: computed(() => userStore.currentUser),


      addUser,
      setCurrentUser,
      // ＝＝＝＝＝＝＝＝＝＝
      injectedValue,
      callProvidedFunction
    }
  }
})
</script>



<template>
  <div>
    <h1>Users:</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
    <button class="bg-green-200" @click="addUser">Add User</button>

    <h1>Current User:</h1>
    <p>{{ currentUser }}</p>
    <button class="bg-green-600" @click="setCurrentUser">Set Current User</button>
    <div>{{ injectedValue }}</div>

    <button class="bg-green-900" @click="callProvidedFunction">callProvidedFunction</button>

  </div>
</template>