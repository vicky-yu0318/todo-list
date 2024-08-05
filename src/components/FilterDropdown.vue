<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue';


export default defineComponent({
    name: 'FilterDropdown',

    props: {
        statuses: {
            type: Array as PropType<Array<string>>,
            required: true
        },
        modelValue: {
            type: Array as PropType<Array<string>>,
            required: true
        },
        style: {
            type: Object,
            required: true
        }

    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const isMenuShow = ref(true)
        // const filter = (e: Event) => {
        //     emit('filter', (e.target as HTMLInputElement).value)
        // }

        // =======
        const internalSelectedStatuses = ref<Array<string>>(props.modelValue);

        watch(() => props.modelValue, (newValue) => {
            internalSelectedStatuses.value = newValue;
        });

        watch(internalSelectedStatuses, (newVal) => {
            emit('update:modelValue', newVal);
        });

        const handleCheckboxChange = (status: string) => {
            const index = internalSelectedStatuses.value.indexOf(status);
            if (index >= 0) {
                internalSelectedStatuses.value.splice(index, 1);
            } else {
                internalSelectedStatuses.value.push(status);
            }
        };

        return {
            isMenuShow,
            // filter
            internalSelectedStatuses,
            handleCheckboxChange,

        }

    }
})
</script>



<template>
    <div class="border border-gray-300 rounded  relative flex items-center ml-auto px-2 ">

        <button class=" h-full " @click="isMenuShow = !isMenuShow">Filter</button>
        <div v-if="isMenuShow" class="absolute  right-0 top-[calc(100%+2px)] shadow w-48 py-2 rounded-lg bg-white">
            <h6 class="font-medium mb-3">Status</h6>
            <ul class="space-y-2 text-sm px-3" :style="style">
                <li v-for="(status, index) in statuses" :key="index" class="flex">
                    <input type="checkbox" class="mr-1" :value="status" :checked="internalSelectedStatuses.includes(status)"
                        @change="handleCheckboxChange(status)" id="`filter_${index}`">
                    <!-- <input :id="`filter_${index}`" type="checkbox" class="mr-1" :value="status" @change="filter"> -->
                    <label :for="`filter_${index}`">{{ status }}</label>
                </li>

            </ul>
        </div>
    </div>
</template>