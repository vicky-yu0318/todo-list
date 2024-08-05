

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import vSelect from './vSelect.vue';
import vInput from './vInput.vue';



export default defineComponent({
    name: 'PracticeSelect',

    components: {
        vSelect,
        vInput
    },
    setup() {
        const subjectOptions = reactive([
            {
                name: "contact.cdnContent",
                value: "Content Delivery Network",
            },
            {
                name: "contact.websiteHosting",
                value: "Virtual Machine Rental/Website Hosting",
            },

        ]);

        const select = ref(
            'llll'
        )

        const title = ref('hihi')

        return {
            subjectOptions,
            select,
            title
        }
    }
})
</script>



<template>
    <vSelect class="text-[16px]" :selectOptions="subjectOptions" v-model="select" id="title">
        <!-- 如有內容就以此為優先 -->
    </vSelect>
    <vInput v-model="title" class="border-blue-300" placeholder="輸入"></vInput>
    <vInput v-model="title" class="border-red-300" placeholder="輸入"></vInput>
    <vInput v-model="title" class="border-green-300" placeholder="輸入"></vInput>
    {{ title }}
</template>