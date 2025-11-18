<template>
  <div>
    <div
      v-if="addlist"
      class="bg-white font-bold w-[320px] h-auto py-4 px-4 justify-center items-center rounded-lg opacity-90"
    >
      <FormList  @close="closeModalAddList" />
    </div>
    <div
      v-else
      class="flex gap-2 bg-gray-100 font-bold opacity-70 w-[290px] h-[40px] cursor-pointer justify-center items-center rounded-lg"
      @click="isAddlist"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 text-black"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      <div class="z-50 text-black font-bold opacity-100 text-lg cursor-pointer">
        Add another list
      </div>
    </div>
  </div>
</template>
<script setup>
import { useListStore } from '@/stores/listStore'
import FormList from './FormList.vue'
import { ref } from 'vue'
const listStore = useListStore()
let addlist = ref(listStore.addlist)

function isAddlist() {
  listStore.isaddlist()
  addlist.value = listStore.addlist
}
function closeModalAddList() {
  listStore.addlist = false
  addlist.value = listStore.addlist
}
</script>
