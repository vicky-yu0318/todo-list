

<script>
import { defineComponent, } from 'vue';

export default defineComponent({
  name: "vSelect",
  props: {
    modelValue: {
      // type: String,
      default: "",
    },
    selectStyle: {
      type: Array,
      default: null,
    },
    defaultSelect: {
      type: String,
      default: '',
    },
    selectOptions: {
      type: Array,
    },
  },
  // emits: [""],
  setup() {


    return {
    }
  }
})
</script>



<template>
  <select class="block w-full mt-1" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
    <!-- <option :value="null">{{ defaultSelect }}</option> -->
    <option v-for="option in selectOptions" :key="option.value">{{ option.name }}</option>
  </select>
  <slot>若使用 vSelect 的預設內容</slot>
</template>