<template>
  <div class="fixed inset-0 z-50 flex justify-center items-start sm:items-center pt-20 sm:pt-0">
    <div
      class="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity flex items-center justify-center h-screen duration-300 opacity-100"
    >
      <div
        class="relative bg-white lg:max-w-[30%] md:max-w-[80%] max-w-[90%] w-1/2 opacity-95 px-8 p-6 mb-10 rounded-2xl"
      >
        <div
          class="flex justify-end"
          @click="($emit('close'), postStore.clearIdPost(), postStore.clearPostDetail(),fctresetValue)"
        >
          <button class="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 sm:w-7 sm:h-7 text-black"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
 
        <h1 class="text-xl sm:text-2xl font-bold text-black">Post details</h1>

        <div class="flex">
          <form class="opacity-100 max-w-xl flex flex-col gap-4 mt-10" @submit.prevent="submitUpdatePost">
            <div>
              <input
                class="font-bold text-gray-900 placeholder:text-black text-4xl rounded-lg focus:ring-black/40 focus:border-black/40 outline-none block w-full px-4 py-3"
                type="text"
                v-model="titleUpdate"
                @click="showSaveButton = true,showCancelButton = true"
                placeholder="Add a title..."
                @blur="validateField('titleUpdate')"
              />
              <span v-if="errors.titleUpdate" class="text-red-400 italic mt-1 ml-4">{{
                errors.titleUpdate
              }}</span>
            
            </div>
              <span class="text-base text-black ml-4  mt-4 mb-4">
                In the list <span class="underline">{{ getListPost(postStore.selectedDetail?.id) }}</span>
              </span>
            <div>
              <textarea
                class="block px-4 py-3 w-full placeholder:text-black placeholder:text-lg sm:placeholder:text-xl text-base text-gray-900 rounded-lg border border-black/50 focus:ring-black/40 focus:border-black/40 resize-none outline-none"
                rows="4"
                v-model="contentUpdate"
                @click="showSaveButton = true,showCancelButton = true"
                placeholder= "Add a description..."
                @blur="validateField('contentUpdate')"
              >
              </textarea>
              <span v-if="errors.contentUpdate" class="text-red-400 italic mt-1 mb-2 ml-4">{{
                errors.contentUpdate
              }}</span>
            </div>

            <div class="flex gap-4 w-full">
              <button
                v-if="showSaveButton"
                id="saveButton"
                type="submit"
                @click="showLoadingSvg=true"
                class="text-white font-bold text-base cursor-pointer justify-center items-center bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-100 rounded-lg px-5 py-2.5"
              ><svg aria-hidden="true" v-if="showLoadingSvg" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
              </svg>
                Save
              </button>
              <button
                v-if="showCancelButton"
                @click="fctCancel"
                type="submit"
                class="text-white font-bold text-base cursor-pointer justify-center items-center bg-red-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-100 rounded-lg px-5 py-2.5"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div class="mt-6 sm:mt-8">
          <CommentComponent />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useListStore } from '@/stores/listStore'
import CommentComponent from './CommentComponent.vue'
import { usePostStore } from '@/stores/postStore'
import { useToast } from 'vue-toastification'
import { computed, reactive, ref, watch } from 'vue'
const toast = useToast()
const postStore = usePostStore()
const listStore = useListStore()

function getCategoryPost(id) {
  for (var i = 0; i < postStore.posts.length; i++) {
    if (postStore.posts[i].id === id) {
      return postStore.posts[i].categories[0]
    }
  }
}
function getListPost(id) {
  for (var i = 0; i < listStore.lists.length; i++) {
    if (listStore.lists[i]?.id == getCategoryPost(id)) {
      return listStore.lists[i].name
    }
  }
}

defineEmits(['close'])
const showSaveButton = ref(false)
const showCancelButton = ref(false)

const titleUpdate = ref('')

const contentUpdate = ref('')
const showLoadingSvg = ref(false)


function fctRemoveHTMLTags(text) {
  if (text != null) {
    const p =document.createElement("p")
    p.innerHTML=text.replace(/<[^>]*>/g, '');
    return p.innerText
  }
}
function fctresetValue(){
  titleUpdate.value = ''
  contentUpdate.value = ''
}

const errors = reactive({
  title: '',
  content: '',
})

const validateField = (field) => {
  errors[field] = ''

  switch (field) {
    case 'titleUpdate':
      if (!titleUpdate.value?.trim()) {
        errors.titleUpdate = 'Title is required'
      } else if (titleUpdate.value.length < 2) {
        errors.titleUpdate = 'Your title must contain at least two characters'
      }
      break

    case 'contentUpdate':
      if (!contentUpdate.value?.trim()) {
        errors.contentUpdate = 'Post description is required'
      } else if (contentUpdate.value.length < 10) {
        errors.contentUpdate = 'Your description must contain at least ten characters'
      }
      break
  }
}

const isFormValid = computed(() => {
  return (
    titleUpdate.value?.trim() && contentUpdate.value?.trim() && !errors.titleUpdate && !errors.contentUpdate
  )
})
async function submitUpdatePost() {
  try {
    Object.keys(errors).forEach(validateField)

    if (isFormValid.value) {
      const updatetoPost = {
        title: titleUpdate.value,
        content: contentUpdate.value,
        status: 'publish',
        categories: [postStore.selectedDetail.categories[0]],
      }
        console.log('titleUpdate',titleUpdate)
        console.log('contentUpdate',contentUpdate)
      console.log("UPDATE TO POST",updatetoPost)

      await postStore.updatePost(postStore.selectedDetail.id, updatetoPost)
       console.log("UPDATE TO POST AFTER",postStore.updatePost(postStore.selectedDetail.id, updatetoPost))
        showCancelButton.value = false
        showSaveButton.value = false
      if(showSaveButton.value === false || showCancelButton.value !== false){
        toast.success(`Post ${titleUpdate.value} successfully updated!`, {
          timeout: 2000,
      })
        }

    }
  } catch (error) {
    console.error(error)
  }
}

function fctCancel(){
  toast.warning(`Update aborted!`, {
          timeout: 2000,
      });
  showCancelButton.value = false;
  showSaveButton.value = false;
  watch(
  ()=> postStore.selectedDetail,
  (newValue) => {if(newValue){
    titleUpdate.value = newValue.title?.rendered
    contentUpdate.value =fctRemoveHTMLTags(newValue.content?.rendered)

  }},
  {immediate : true}
)}
watch(
  ()=> postStore.selectedDetail,
  (newValue) => {if(newValue){
    titleUpdate.value = newValue.title?.rendered
    contentUpdate.value =fctRemoveHTMLTags(newValue.content?.rendered)

  }},
  {immediate : true}
)

</script>

