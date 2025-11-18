<template>
    <div class="fixed inset-0 z-60 flex items-center justify-center ">
      <div
        class="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 opacity-100"
      ></div>
      <form
        @submit.prevent="
          submitSuppressionPost(postStore.postSuppress?.id, postStore.postSuppress?.name)
        "
      >
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full opacity-100">
          <div class="flex items-center justify-between p-4 md:p-5 rounded-t border-gray-200">
            <div class="flex gap-8 items-start">
              <div class="p-3 rounded-full flex-shrink-0 bg-red-100">
                <svg
                  class="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.08 14.5c-.77.833.192 2.5 1.732 2.5z"
                  ></path>
                </svg>
              </div>
              <div>
                <div class="font-semibold text-gray-900 text-2xl mb-4">Confirm deletion</div>
                <div class="text-base text-gray-900 break-all">
                  Are you sure you want to delete this post {{ postStore.postSuppress?.name }} ?
                </div>
                <div class="text-base text-gray-900 mt-2">This action is irreversible.</div>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="flex gap-6 w-full justify-end">
              <button
                type="button"
                @click="($emit('close'), postStore.clearSuppressPost())"
                data-dialog-close="true"
                class="text-gray-900 cursor-pointer border border-gray-300 font-medium text-base rounded-lg px-5 py-2.5"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="text-white font-medium text-base inline-flex gap-2 cursor-pointer justify-center items-center bg-red-600 focus:ring-4 focus:outline-none rounded-lg px-5 py-2.5"
              >
                <div v-if="postStore.loading === false" class="inline-flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  Delete
                </div>
                <div v-else class="inline-flex gap-4">
                  <VueSpinner size="20" color="white" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>

</template>

<script setup>
import { usePostStore } from '@/stores/postStore'
import { useToast } from 'vue-toastification'
import { VueSpinner } from 'vue3-spinners'
const toast = useToast()

const postStore = usePostStore()

const emit = defineEmits(['close'])

async function submitSuppressionPost(idPost, namePost) {
  try {
    postStore.deletePostStore(idPost)
    postStore.clearSuppressPost()
    await postStore.suppressPost(idPost)
    postStore.fetchPost()
    emit('close')
    toast.success(`Post deletion ${namePost} `, {
      timeout: 2000,
    })
  } catch (error) {
    toast.error(error)
  }
}
</script>
