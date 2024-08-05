import { ref } from "vue";

const showModal = ref(false);
const component = ref();

// const handleModal = () => {
//   showModal.value = !showModal.value;
// };

export function useModal() {
  return {
    component,
    showModal,
    handleModal: () => (showModal.value = !showModal.value),
  };
}
