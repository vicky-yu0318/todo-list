<template>
  <div class="todo-app">
    <div class="container">
      <div class="header-todo">
        <h1>待辦事項</h1>
        <div>
          <input v-model.trim="newTodo" placeholder="新增待辦事項" />
          <button @click="addTodo" class="btn">新增</button>
        </div>
        <div class="wrap-btn-category">
          <!-- 方法1 -->
          <!-- <select v-model="category">
            <option value="all">全部</option>
            <option value="completed">已完成</option>
            <option value="uncompleted">未完成</option>
          </select> -->
          <!-- 方法2 -->
          <div class="btn-category">
            <button :class="{ 'btn-active': category === 'all' }" @click="category = 'all'">全部</button>
            <button :class="{ 'btn-active': category === 'completed' }" @click="category = 'completed'">已完成</button>
            <button :class="{ 'btn-active': category === 'uncompleted' }" @click="category = 'uncompleted'">未完成</button>
          </div>
        </div>
      </div>
      <div class="todo-list" :class="{ active: filteredTodoList.length > 0 }">
        <ul>
          <li v-for="todo in filteredTodoList" :key="todo.id">
            <div>
              <input type="checkbox" v-model="todo.isCompleted" />
              <span :class="{ completed: todo.isCompleted }">{{ todo.text }}</span>
            </div>
            <button @click="removeTodo(todo.id)" class="btn">刪除</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted } from 'vue';

interface TodoList {
  id: number;
  text: string;
  isCompleted: boolean;
}

export default defineComponent({
  name: 'TodoApp',
  setup() {
    onMounted(() => {
      console.log('Component mounted');
      // 在组件挂载后执行的逻辑
    });


    const newTodo = ref('');
    const todoList = reactive<TodoList[]>([]);
    const category = ref('all');

    const addTodo = () => {
      if (newTodo.value) {
        todoList.push({
          id: Date.now(),
          text: newTodo.value,
          isCompleted: false,
        });
        newTodo.value = '';
      }
    };

    const removeTodo = (id: number) => {
      const removeIndex = todoList.findIndex(todo => todo.id === id);
      if (removeIndex !== -1) {
        todoList.splice(removeIndex, 1);
      }
    };

    const filteredTodoList = computed(() => {
      switch (category.value) {
        case 'completed':
          return todoList.filter(todo => todo.isCompleted);
        case 'uncompleted':
          return todoList.filter(todo => !todo.isCompleted);
        default:
          return todoList
      }
    });

    return {
      newTodo,
      todoList,
      category,
      addTodo,
      removeTodo,
      filteredTodoList,
    };
  },
});
</script>

<style scoped>
.todo-app {
  display: flex;
  justify-content: center;
  align-items: center;
}

.todo-app .container {
  width: 50%;
  max-width: 600px;
}

@media screen and (max-width: 768px) {
  .todo-app .container {
    width: 90%;
  }
}


.btn {
  margin-left: 10px;
}

.btn-active {
  background-color: #fa0;
  border: .5px solid #ccc;
}

.completed {
  text-decoration: line-through;
}

.header-todo {
  text-align: center;
}

.wrap-btn-category {
  margin: 20px 0;
}

.btn-category {
  width: 30%;
  display: flex;
  justify-content: space-around;
}

@media screen and (max-width: 768px) {
  .btn-category {
    width: 70%;
    justify-content: start;
  }
}

.btn-category button {
  cursor: pointer;
}

.todo-list {
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
}

.todo-list.active {
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 0 8px;
}

.todo-list ul {
  padding-left: 0;
}

.todo-list li {
  margin-bottom: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
