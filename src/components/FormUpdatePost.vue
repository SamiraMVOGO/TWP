<template>
  <form @submit.prevent="submitUpdateNamePost()">
    <div>
      <input
        type="text"
        name="titlePost"
        class="w-full border-1 border-gray-300 placeholder:text-lg placeholder:text-black py-3 px-2 rounded-lg outline-none"
        v-model="titlePost"
        @blur="validateField('titlePost')"
      />
      <span v-if="errors.titlePost" class="text-red-400 italic mt-1">{{ errors.titlePost }}</span>
    </div>
    <div class="flex gap-4 mt-2">
      <button type="submit" class="bg-green-300 py-2 w-[80px] rounded-lg cursor-pointer">
        <div v-if="postStore.loading === false">Save</div>
        <div v-else class="inline-flex gap-4">
          <VueSpinner size="20" color="white" />
        </div>
      </button>

      <div>
        <button
          type="button"
          class="border border-gray-300 py-2 w-[80px] rounded-lg cursor-pointer"
          @click="$emit('close')"
        >
          Cancel
        </button>
      </div>
    </div>
  </form>
</template>
<script setup>
import { computed, reactive, ref } from 'vue'
import { VueSpinner } from 'vue3-spinners'
import { useToast } from 'vue-toastification'
import { usePostStore } from '@/stores/postStore'
// import { useListStore } from '@/stores/listStore'
const toast = useToast()
const postStore = usePostStore()
// const listStore = useListStore()

const props = defineProps({
  idlist: Number,
  title: Object,
})

const titlePost = ref(props.title.rendered)

const errors = reactive({
  titlePost: '',
})

const validateField = (field) => {
  errors[field] = ''

  switch (field) {
    case 'titlePost':
      if (!titlePost.value?.trim()) {
        errors.titlePost = 'Title is required'
      } else if (titlePost.value.length < 2) {
        errors.titlePost = 'Your title must contain at least two characters'
      }

      break
  }
}

const isFormValid = computed(() => {
  return titlePost.value?.trim() && !errors.titlePost
})

const emit = defineEmits(['close'])
async function submitUpdateNamePost() {
  try {
    Object.keys(errors).forEach(validateField)

    if (isFormValid.value) {
      const postupdateparams = {
        title: titlePost.value,
      }
     
      await postStore.updatePostName(postStore.idpostUpdate.value, postupdateparams)
      
      postStore.idpostUpdate = {}
      postStore.fetchPostBylist(props.idlist)

      emit('close')

      toast.success(`Post title ${postupdateparams.title} modified.`, {
        timeout: 2000,
      })
      titlePost.value = ''
    }
  } catch (error) {
    console.error(error)
  }
}
</script>
