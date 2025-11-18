<template>
  <div v-if="addlist">
    <form @submit.prevent="submitAddlist" class="flex flex-col gap-4 ">
      <div>
        <input
          class="border border-black/50 text-gray-900 text-base rounded-lg focus:ring-black/40 focus:border-black/40 outline-none block w-full px-4 py-3"
          type="text"
          v-model="nameAdd"
          placeholder="Enter list name ..."
          @blur="validateField('nameAdd')"
        />
        <span v-if="errors.nameAdd" class="text-red-400 italic mt-1">{{ errors.nameAdd }}</span>
      </div>
      <div>
        <input
          class="border border-black/50 text-gray-900 text-base rounded-lg focus:ring-black/40 focus:border-black/40 outline-none block w-full px-4 py-3"
          type="text"
          v-model="slugAdd"
          placeholder="Enter list slug ..."
          @blur="validateField('slugAdd')"
        />
        <span v-if="errors.slugAdd" class="text-red-400 italic mt-1">{{ errors.slugAdd }}</span>
      </div>
      <div>
        <textarea
          class="block px-4 py-3 w-full text-base text-gray-900 rounded-lg border border-black/50 focus:ring-black/40 focus:border-black/40 resize-none outline-none"
          rows="4"
          cols="100"
          v-model="descriptionAdd"
          placeholder="Enter list description ..."
          @blur="validateField('descriptionAdd')"
        >
        </textarea>
        <span v-if="errors.descriptionAdd" class="text-red-400 italic mt-1">{{
          errors.descriptionAdd
        }}</span>
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
          <div v-if="listStore.loading === false" class="inline-flex gap-4">
           <div class="flex gap-2">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
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
  </div>
  <div v-else>
    <form @submit.prevent="submitUpdatelist" class="flex flex-col gap-4 opacity-90">
      <div>
        <input
          class="border border-black/50 text-gray-900 text-base rounded-lg focus:ring-black/40 focus:border-black/40 outline-none block w-full px-4 py-3"
          type="text"
          v-model="nameUpdate"
          placeholder="Enter list name ..."
           @blur="validateField('nameUpdate')"
        />
        <span v-if="errors.nameUpdate" class="text-red-400 italic mt-1">{{ errors.nameUpdate }}</span>
      </div>
      <div>
        <input
          class="border border-black/50 text-gray-900 text-base rounded-lg focus:ring-black/40 focus:border-black/40 outline-none block w-full px-4 py-3"
          type="text"
          v-model="slugUpdate"
          placeholder="Enter list slug ..."
           @blur="validateField('slugUpdate')"
        />
        <span v-if="errors.slugUpdate" class="text-red-400 italic mt-1">{{ errors.slugUpdate }}</span>
      </div>
      <div>
        <textarea
          class="block px-4 py-3 w-full text-base text-gray-900 rounded-lg border border-black/50 focus:ring-black/40 focus:border-black/40 resize-none outline-none"
          rows="4"
          cols="100"
          v-model="descriptionUpdate"
          placeholder="Enter list description ..."
           @blur="validateField('descriptionUpdate')"
        >
        </textarea>
        <span v-if="errors.descriptionUpdate" class="text-red-400 italic mt-1">{{ errors.descriptionUpdate }}</span>
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
          <div v-if="listStore.loading === false" class="inline-flex gap-4">
           <div class="flex gap-2">
                 <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Save
           </div>
          </div>
          <div v-else class="inline-flex gap-4">
            <VueSpinner size="20" color="white" />
          </div>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { VueSpinner } from 'vue3-spinners'
import { useListStore } from '@/stores/listStore'
import { useToast } from 'vue-toastification'
import { reactive, ref } from 'vue'
import { computed } from 'vue'

const toast = useToast()
const listStore = useListStore()

const addlist = listStore.addlist
const props = defineProps({
  name: String,
  description: String,
  slug: String,
  id: Number,
})

const idUpdate = ref(props.id)
const nameUpdate = ref(props.name)
const descriptionUpdate = ref(props.description)
const slugUpdate = ref(props.slug)

const nameAdd = ref('')
const descriptionAdd = ref('')
const slugAdd = ref('')


const emit = defineEmits(['close'])

const errors = reactive({
  nameAdd: '',
  descriptionAdd: '',
  slugAdd: '',
  nameUpdate: '',
  descriptionUpdate: '',
  slugUpdate: '',
})

const validateField = (field) => {
  errors[field] = ''

  switch (field) {
    case 'nameAdd' :
      if (!nameAdd.value?.trim()) {
        errors.nameAdd = 'Title is required'
      } else if (nameAdd.value.length < 2) {
        errors.nameAdd = 'Your title must contain at least two characters'
      }
      
      break
      case 'nameUpdate':
      if (!nameUpdate.value?.trim()) {
        errors.nameUpdate = 'Title is required'
      } else if (nameUpdate.value.length < 2) {
        errors.nameUpdate = 'Your title must contain at least two characters'
      }
      
      break

    case 'slugAdd':
      if (!slugAdd.value?.trim()) {
        errors.slugAdd = 'List slug is required'
      } else if (slugAdd.value.length < 2) {
        errors.slugAdd = 'Your title must contain at least two characters'
      }
      break
    
      case 'slugUpdate':
      if (!slugUpdate.value?.trim()) {
        errors.slugUpdate = 'List slug is required'
      } else if (slugUpdate.value.length < 2) {
        errors.slugUpdate = 'Your title must contain at least two characters'
      }
      break
    case 'descriptionAdd':
      if (!descriptionAdd.value?.trim()) {
        errors.descriptionAdd = 'List description is required'
      } else if (descriptionAdd.value.length < 10) {
        errors.descriptionAdd = 'Your description must contain at least ten characters'
      }
      break
       case 'descriptionUpdate':
      if (!descriptionUpdate.value?.trim()) {
        errors.descriptionUpdate = 'List description is required'
      } else if (descriptionUpdate.value.length < 10) {
        errors.descriptionUpdate = 'Your description must contain at least ten characters'
      }
      break
  }
}

const isFormValid = computed(() => {
  return (
    nameAdd.value?.trim() ||
    (nameUpdate.value?.trim() && slugAdd.value?.trim()) ||
    (slugUpdate.value?.trim() && descriptionAdd.value?.trim()) ||
    (descriptionUpdate.value?.trim() && !errors.nameAdd) ||
    (!errors.nameUpdate && !errors.slugAdd) ||
    (!errors.slugUpdate && !errors.descriptionAdd) ||
    !errors.descriptionUpdate
  )
})

async function submitAddlist() {
  try {
    Object.keys(errors).forEach(validateField)

    if (isFormValid.value) {
      const listparams = {
        name: nameAdd.value,
        description: descriptionAdd.value,
        slug: slugAdd.value,
      }

      await listStore.addList(listparams)
      listStore.fetchList()
      emit('close')
      toast.success(`Note ${listparams.name} added.`, {
        timeout: 2000,
      })
      nameAdd.value = ''
      descriptionAdd.value = ''
      slugAdd.value = ''
    }
  } catch (error) {
    console.error(error)
  }
}

async function submitUpdatelist() {
  try {
    Object.keys(errors).forEach(validateField)

    if (isFormValid.value) {
      const listparams = {
        name: nameUpdate.value,
        description: descriptionUpdate.value,
        slug: slugUpdate.value,
      }
      listStore.deleteListStore(idUpdate.value)
      const response = await listStore.updateList(idUpdate.value, listparams)

      listStore.addListStore(response)
      listStore.fetchList()
      emit('close')
      toast.success(`Note ${listparams.name} successfully modified.`, {
        timeout: 2000,
      })
      nameUpdate.value = ''
      descriptionUpdate.value = ''
      slugUpdate.value = ''
    }
  } catch (error) {
    console.error(error)
  }
}
</script>
