<template>
  <!-- v-bind="$attrs" -->
  <!-- 當你在父元件中為子元件新增 class 或 style 屬性時，這些屬性會自動套用到子元件的根元素上，即使你沒有在子元件中明確使用 v-bind="$attrs"。 -->
  <input class="border" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script>



export default {

  name: "vInput",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup() {


    return {
    }
  }
}
</script>

