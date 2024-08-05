

<script lang="ts">
import { defineComponent, PropType, watch, ref } from 'vue';


export default defineComponent({
    name: 'FilterRadio',
    // 方法1: emits: ['update:searchVal'],
    // emits: ['search'],
    props: {
        options: {
            type: Array as PropType<Array<{ label: string, value: string }>>,
            required: true
        },
        modelValue: {
            type: String,
            required: true
        },
    },
    emits: ['update:modelValue'], //如果你定義了 emits，當你錯誤地使用事件時，Vue 會在開發模式下給出警告 //雖然省略 emits 定義在 Vue 3 中是可以的，但在某些情況下，如果將程式碼移植到 Vue 2 中，可能會出現問題。
    setup(props, { emit }) {
        const internalValue = ref(props.modelValue);



        watch(() => props.modelValue, (newValue) => {
            internalValue.value = newValue;
        });

        // watch(internalValue, newValue => {
        //     emit('update:modelValue', newValue);
        // });

        const updateValue = () => {
            emit('update:modelValue', internalValue.value);
        };


        // 使用 ref 定義 internalValue，並將其與 v - model 綁定。
        // 監視 props.modelValue 的變化，並更新 internalValue。
        // 當內部值變化時，通過 emit 發送事件更新父元件中的值
        return {
            internalValue,
            updateValue
        }

    }
})
</script>



<template>
    <label class="flex items-center mr-4  " v-for="option in options" :key="option.value">
        <input type="radio" :value='option.value' v-model="internalValue" @change="updateValue">
        <!-- <input type="radio" :value='option.value' v-model="internalValue"> -->
        <span class="whitespace-nowrap ml-1 ">{{ option.label }}</span>
    </label>
</template>