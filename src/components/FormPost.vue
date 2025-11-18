<template>
  <form @submit.prevent="submitAddPost" class="flex flex-col gap-4">
    <div>
      <input
        class="border border-black/50 text-gray-900 text-base rounded-lg focus:ring-black/40 focus:border-black/40 outline-none block w-full px-4 py-3"
        type="text"
        v-model="title"
        placeholder="Enter post title ..."
        @blur="validateField('title')"
      />
      <span v-if="errors.title" class="text-red-400 italic mt-1">{{ errors.title }}</span>
    </div>
    <div>
      <textarea
        class="block px-4 py-3 w-full text-base text-gray-900 rounded-lg border border-black/50 focus:ring-black/40 focus:border-black/40 resize-none outline-none"
        rows="4"
        cols="100"
        v-model="content"
        placeholder="Enter post description"
        @blur="validateField('content')"
      >
      </textarea>
      <span v-if="errors.content" class="text-red-400 italic mt-1">{{ errors.content }}</span>
    </div>

    <div>

    </div>
    <div class="flex gap-6 w-full">
      <button
        type="button"
        @click="emit('close')"
        data-dialog-close="true"
        class="w-[50%] cursor-pointer border text-black border-gray-300 font-medium text-base rounded-lg"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="text-white w-[50%] font-medium text-base cursor-pointer justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-100 rounded-lg px-5 py-2.5"
      >
        <div v-if="postStore.loading === false" class="inline-flex gap-4">
         <div class="flex gap-2">
 <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5 text-bold"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create
         </div>
          
        </div>
        <div v-else class="inline-flex gap-4">
          <VueSpinner size="20" color="white" />
        </div>
      </button>
    </div>
  </form>
</template>

<script setup>
import { VueSpinner } from 'vue3-spinners'
import { useToast } from 'vue-toastification'
import { reactive, ref } from 'vue'
import { computed } from 'vue'
import { usePostStore } from '@/stores/postStore'

const toast = useToast()
const postStore = usePostStore()

const title = ref('')
const content = ref('')


const emit = defineEmits(['close'])

const errors = reactive({
  title: '',
  content: '',
})

const props = defineProps({
  id: Number,
})
const idlist = props.id

const validateField = (field) => {
  errors[field] = ''

  switch (field) {
    case 'title':
      if (!title.value?.trim()) {
        errors.title = 'Title is required'
      } else if (title.value.length < 2) {
        errors.title = 'Your title must contain at least two characters'
      }
      break

    case 'content':
      if (!content.value?.trim()) {
        errors.content = 'Post description is required'
      } else if (content.value.length < 10) {
        errors.content = 'Your description must contain at least ten characters'
      }
      break
  }
}

const isFormValid = computed(() => {
  return title.value?.trim() && content.value?.trim() && !errors.title && !errors.content
})

async function submitAddPost() {
  try {
    Object.keys(errors).forEach(validateField)

    if (isFormValid.value) {
      const postparams = {
        title: title.value,
        content: content.value,
        status: "publish",
        categories: [idlist],
      }
      
      await postStore.addPost(postparams)
      emit('close')
      toast.success(`Post ${postparams.title} added.`, {
        timeout: 2000,
      })
      title.value = ''
      content.value = ''
    }
  } catch (error) {
    console.error(error)
  }
}
</script>
