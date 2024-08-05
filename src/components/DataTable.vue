

<script lang="ts">
import { defineComponent, PropType, computed, ref, reactive } from 'vue';
import SearchForm from './SearchForm.vue';
import FilterRadio from './FilterRadio.vue';
import FilterDropdown from './FilterDropdown.vue';
import { format } from 'date-fns';


export default defineComponent({
    name: 'DataTable',
    props: {
        items: {
            type: Array as PropType<Array<{ id: number, title: string, status: string, timeStamps: number }>>,
            required: true
        }
    },
    components: {
        SearchForm,
        FilterRadio,
        FilterDropdown
    },
    setup(props) {
        const searchVal = ref('')
        // const handleSearch = (val: string) => {
        //     searchVal.value = val
        // }
        const filteredItems = computed(() => {
            let items = props.items;

            // TODO: 第一關過濾-時間
            switch (selectedOption.value) {
                case 'today':
                    items = items.filter((item) => item.timeStamps === new Date().getTime())
                    break;
                case 'past':
                    items = items.filter((item) => item.timeStamps < new Date().getTime())
                    break;
                default:
                    break;
            }

            // TODO: 第二關過濾-status
            if (statusesFilter.value.length) {
                items = items.filter((item) => statusesFilter.value.includes(item.status))
            }


            // TODO: 第三關過濾- 關鍵字
            if (searchVal.value !== '') {
                items = items.filter((item) => item.title.includes(searchVal.value))
            }

            return items
        })
        const formatDate = (timestamp: number) => {
            return format(new Date(timestamp), 'yyyy/MM/dd');
        };
        // ===================
        const options = ref([
            { label: 'all', value: 'all' },
            { label: 'today', value: 'today' },
            { label: 'past', value: 'past' },

        ]);
        const selectedOption = ref('all');
        // ===================
        const statuses = computed(() => {
            return [...new Set(props.items.map((item) => item.status))]
        })
        // console.log('statuses :>> ', statuses.value); // []

        const statusesFilter = ref<Array<string>>([])
        // const handleCheckboxFilter = (filter: string) => {
        //     if (statusesFilter.value.includes(filter)) {
        //         statusesFilter.value.splice(statusesFilter.value.indexOf(filter), 1);
        //     } else {
        //         statusesFilter.value.push(filter)
        //     }
        // }

        // ===================
        const style = reactive({ backgroundColor: '#faa' })
        return {
            // handleSearch,
            searchVal,
            filteredItems,
            formatDate,
            options,
            selectedOption,
            statuses,
            statusesFilter,
            // handleCheckboxFilter
            style
        }
    }
})
</script>



<template>
    <div class="flex">
        <!-- <SearchForm @search="handleSearch" /> -->
        <SearchForm v-model="searchVal" />
        <FilterRadio :options="options" v-model="selectedOption" />
        <!-- <FilterDropdown :statuses="statuses" @filter="handleCheckboxFilter" /> -->
        <FilterDropdown :statuses="statuses" v-model="statusesFilter" :style="style" />

    </div>



    <table class="w-full text-left text-gray-500">
        <thead class="text-gray-700 uppercase bg-gray-50">
            <tr class="child-th:text-red-500">
                <th class="w-1/8">ID</th>
                <th class="w-4/8">Title</th>
                <th class="w-1/8">Status</th>
                <th class="w-1/8">Due At</th>
            </tr>
        </thead>
        <tr v-for="item in filteredItems" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.status }}</td>
            <td>{{ formatDate(item.timeStamps) }}</td>
        </tr>


    </table>
</template>