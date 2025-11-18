<template>
  <div>
    <div
      v-if="isaddpost === false"
      @click="isAddlist"
      class="flex gap-2 hover:bg-black/20 px-2 font-bold opacity-100 h-[40px] items-center cursor-pointer  rounded-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-5 text-black"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      <div class="z-50 text-black font-bold opacity-100 text-base cursor-pointer" >
        Add post
      </div>
    </div>

    <div class="border border-black/20 rounded-lg p-4" v-else>
      <FormPost @close="closeModalAddPost" :id="idlist" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import FormPost from './FormPost.vue'
const props = defineProps({
  id: Number,
})
const idlist=props.id

const isaddpost = ref(false)
function isAddlist() {
  isaddpost.value = true
}
function closeModalAddPost() {
  isaddpost.value = false
}
</script>
