<script lang="ts">
import { defineComponent, } from 'vue';



export default defineComponent({
    name: 'ModalConfirm',
    components: {
    },
})
</script>

<template>
    <div class="bg-slate-300 absolute right-0 left-0 top-0 bottom-0 flex justify-center items-center ">
        <div class=" bg-white shadow-xl w-64 p-5" role="dialog" aria-modal="true">
            <h3>Do you confirm?</h3>
            <button @click="$emit('close')">close</button>
            <!-- emit('update:modelValue', internalValue.value); -->
            <!-- @input="$emit('input', $event.target.value)" -->
        </div>
    </div>
</template>