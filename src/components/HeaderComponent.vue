<template>
  <header class="bg-blue-600 text-white">
    <div class="mx-auto max-w-screen-3xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex-1 md:flex md:items-center md:gap-12">
          <a class="block text-white font-bold text-2xl" href="#"> Plannify </a>
        </div>

        <div class="flex gap-4">
          <div class="md:flex md:items-center md:gap-12">
          <div class="relative hidden md:block">
            <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <svg
                class="w-6 h-6 text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="text-lg font-bold text-white flex justify-center items-center">  Welcome, {{ commentStore.user[0]?.name }}</div>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { useCommentStore } from '@/stores/commentStore'

import { onMounted } from 'vue'

const commentStore = useCommentStore()
onMounted(() => {
  commentStore.fetchuser()
})
</script>
