

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';


export default defineComponent({
    name: 'SearchForm',
    props: {
        modelValue: {
            type: String,
            required: true
        }
    },
    emits: ['update:modelValue'],

    setup(props, { emit }) {

        // const search = (e: Event) => {
        //     emit('search', (e.target as HTMLInputElement).value)
        // }

        const internalValue = ref(props.modelValue);

        watch(() => props.modelValue, newValue => {
            internalValue.value = newValue;
        });

        const updateValue = (e: Event) => {
            const value = (e.target as HTMLInputElement).value;
            internalValue.value = value;
            emit('update:modelValue', value);
        };

        return {
            // search
            internalValue,
            updateValue

        }

    }
})
</script>



<template>
    <form class="flex py-3 px-4" v-bind="$attrs">
        <label class="sr-only">Search</label>
        <div>
            <input type="text" v-model="internalValue" @input="updateValue" placeholder="Search"
                class="bg-gray-50 border-gray-300">
            <!-- <input type="text" @input="search" placeholder="Search" class="bg-gray-50 border-gray-300"> -->
        </div>
    </form>
</template>