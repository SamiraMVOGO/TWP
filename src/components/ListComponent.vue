<template>
  <div
    v-if="isupdate === false"
    class="font-bold bg-white opacity-90 w-[290px] backdrop-blur-sm shadow-lg h-auto text-black rounded-xl px-4 py-4"
  >
    <div class="flex justify-between break-all line-clamp-2">
      <div>
        {{ fctRemoveHTMLTags(nameParam) }}
      </div>

      <div class="flex gap-2 h-[35px]">
        <button class="p-1 bg-gray-100 rounded-md cursor-pointer z-50" :disabled="listStore.addlist===true" @click="updatelist()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>

        <div
          v-if="idParam !== 1"
          @click="showModalSuppresslist(idParam, nameParam)"
          class="p-1 bg-gray-100 rounded-md z-50 cursor-pointer"
        >
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
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-8 mt-4">
      <CardComponent :id="idParam"  @clickShowDetails="showModalDetailpost" @clickSuppress="showModalSuppresspost"/>
    </div>
    <div class="mt-4">
      <ButtonAddPost :id="idParam" :name="nameParam" />
    </div>
  </div>
  <div v-else>
    <div
      class="bg-white opacity-90 font-bold shadow-lg w-[320px] h-auto py-4 px-4 justify-center items-center rounded-lg"
    >
      <FormList
        @close="closeModalUpdateList()"
        :id="idParam"
        :name="nameParam"
        :slug="slugParam"
        :description="descriptionParam"
      />
    </div>
  </div>

  <SuppressListModal v-show="isModalVisibleSuppresslist" @close="closeModalSuppresslist" />
  <SuppressPostModal v-show="isModalVisibleSuppresspost" @close="closeModalSuppresspost" />
  <DetailCard  v-show="isModalVisibleDetailpost" @close="closeModalDetailpost"/>
</template>

<script setup>
import { useListStore } from '@/stores/listStore'
import FormList from './FormList.vue'
import { ref } from 'vue'
import SuppressListModal from './SuppressListModal.vue'
import ButtonAddPost from './ButtonAddPost.vue'
import CardComponent from './CardComponent.vue'
import SuppressPostModal from './SuppressPostModal.vue';
import DetailCard from './DetailCard.vue'
import { usePostStore } from '@/stores/postStore'


const props = defineProps({
  name: String,
  description: String,
  slug: String,
  id: Number,
})
const listStore = useListStore()
const postStore=usePostStore()
const isModalVisibleSuppresspost = ref(false)

function showModalSuppresspost(idpost, namepost) {
  isModalVisibleSuppresspost.value = true
  postStore.storeSuppressPost(idpost, namepost)
}

const closeModalSuppresspost = () => {
  isModalVisibleSuppresspost.value = false
}
function fctRemoveHTMLTags(text) {
  if (text != null) {
    const p =document.createElement("p")
    p.innerHTML=text.replace(/<[^>]*>/g, '');
    return p.innerText
  }
}

const idParam = ref(props.id)
const slugParam = ref(props.slug)
const nameParam = ref(props.name)
const descriptionParam = ref(props.description)

const isupdate = ref(false)

const isModalVisibleSuppresslist = ref(false)
const isModalVisibleDetailpost = ref(false)

function showModalSuppresslist(idlist, namelist) {
  isModalVisibleSuppresslist.value = true
  listStore.storeSuppressList(idlist, namelist)
}

const closeModalSuppresslist = () => {
  isModalVisibleSuppresslist.value = false
}

function showModalDetailpost(idpost) {
  postStore.storeIdPost(idpost)
  postStore.storePostDetail(idpost)
  isModalVisibleDetailpost.value = true
}

const closeModalDetailpost = () => {
  isModalVisibleDetailpost.value = false
}


function updatelist() {
  isupdate.value = true
}
function closeModalUpdateList() {
  isupdate.value = false
}
</script>
