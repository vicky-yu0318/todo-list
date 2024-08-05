
<script lang="ts">
import { defineComponent, markRaw, onMounted, ref, toRefs, provide } from 'vue';
// import TodoApp from './components/TodoApp.vue';
// import DataTable from './components/DataTable.vue';
// import PracticeSelect from './components/PracticeSelect.vue';
import ModalConfirm from './components/ModalConfirm.vue';
import ModalOverview from './components/ModalOverview.vue';
import MapMove from './components/MapMove.vue';
import LoginVal from '@/components/LoginVal.vue'; // 在 Vue CLI 中，預設情況下，@ 別名也已經設定好了，所以你可以直接使用它而不需要額外配置：
import { useModal } from './composables/useModal'
import { useCounterStore } from './stores/counter';
import { useUserStore } from './stores/userStore'
import PraStore from '@/components/PraStore.vue'





export default defineComponent({
  name: 'App',
  components: {
    // TodoApp,
    // DataTable,
    // PracticeSelect,
    ModalConfirm,
    MapMove,
    LoginVal,
    PraStore
  },

  setup() {
    const counterStore = useCounterStore();
    const { count, increment } = toRefs(counterStore); // 確保只返回需要的響應式狀態和方法
    // ============
    const items = ref([]);
    // ============


    function getRandomTimestamp() {
      const now = Date.now();
      const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;
      const randomTime = now - Math.random() * oneWeekInMillis;
      return Math.floor(randomTime)
    }
    function getRandomStatus() {
      const statuses = ['blocked', 'completed', 'planned', 'in progress', 'started'];
      const randomIndex = Math.floor(Math.random() * statuses.length);
      return statuses[randomIndex];
    }

    onMounted(async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/')
      const tempAry = await res.json();
      items.value = tempAry.map((temp: Object) => ({ ...temp, timeStamps: getRandomTimestamp(), status: getRandomStatus() }))
    })

    // ==========
    // const showModal = ref(true);
    // const handleModal = () => {
    //   showModal.value = !showModal.value;
    // }

    const modal = useModal();
    const openConfirm = () => {
      modal.component.value = markRaw(ModalConfirm);
      modal.handleModal()
    }
    const openOverview = () => {
      modal.component.value = markRaw(ModalOverview);
      modal.handleModal()
    }
    // =====================
    const userStore = useUserStore();
    const users = ref(userStore.users); // 使用 ref 可以避免每次模板更新時都重新計算 userStore.users
    // const { users } = ref(userStore).value; // ok
    // const { users } = toRefs(userStore); // ok

    // =====================
    const providedValue = ref('Hello from Parent');
    provide('providedValue', providedValue);
    const providedFunction = (message) => {
      alert(`Message from child: ${message}`);
    };

    provide('providedFunction', providedFunction);



    return {
      items,
      // handleModal,
      // showModal,
      openConfirm,
      modal,
      openOverview,
      // count: counterStore.count,
      // increment: counterStore.increment,
      // ...toRefs(counterStore)
      count,
      increment,
      users
    }

  }
});
</script>
<template>
  <div id="app">
    <!-- <TodoApp /> -->
    <!-- <DataTable :items="items" /> -->
    <!-- <PracticeSelect /> -->
    <div class="flex justify-center items-center min-h-screen bg-blue-200">

      <div>
        <p>{{ count }}</p>
        <button @click="increment">Increment</button>
      </div>


      <div> 首頁： {{ users }}</div>


      <div>
        <Teleport to="#modal">
          <Transition name="fade">
            <component :is="modal.component.value" @close="modal.handleModal" v-if="modal.showModal.value" />
          </Transition>
        </Teleport>
        <!-- <ModalConfirm @close="modal.handleModal" /> -->
        <MapMove />
        <LoginVal />
      </div>

      <PraStore />

    </div>

    <button @click="openConfirm">Open Confirm Modal</button>
    <button @click="openOverview">Open Overview Modal</button>

  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
