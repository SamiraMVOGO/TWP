<template>
  <div class="">
    <div class="mt-10 mb-8">
      <h2 class="text-xl font-bold text-black">Comments</h2>
      <form @submit.prevent="submitComment" class="flex space-x-2 justify-center items-center">
        <input
          v-model="commentContent"
          class="flex-1 border text-black border-gray-300 rounded-lg px-4 py-4 resize-none h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
          placeholder="Write your comment..."
        />
        <button
          type="submit"
          class="bg-gray-500 hover:bg-blue-600 text-white mt-2 p-2 rounded-lg flex items-center justify-center cursor-pointer"
        >
          <i class="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>

    <div v-if="commentStore.fetchCommentByPost(postStore.selectedDetail?.id).length !== 0" class="h-[200px] overflow-y-auto">
      <div
        v-for="comment in commentStore.fetchCommentByPost(postStore.selectedDetail?.id)"
        :key="comment.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col space-y-2 mb-4 "
      >
        <div class="flex justify-between items-center text-gray-500 text-sm">
          <div class="flex items-center gap-6">
            <div
              class="w-10 h-10 bg-green-400 text-white rounded-full flex items-center justify-center font-bold"
            >
              {{ comment.author_name[0]?.toUpperCase() || 'A' }}
            </div>
            <div>
              <p class="font-semibold text-gray-800">{{ comment.author_name || 'Anonyme' }}</p>
              <p>{{ new Date(comment.date).toLocaleString() }}</p>
            </div>
          </div>

          <div class="flex space-x-2">
            <button @click="startEdit(comment)" class="text-yellow-500 hover:text-yellow-600">
              <i class="fas fa-edit text-xl cursor-pointer"></i>
            </button>
            <button @click="deleteComment(comment.id)" class="text-red-500 hover:text-red-700">
              <i class="fas fa-trash-alt text-xl cursor-pointer"></i>
            </button>
          </div>
        </div>

        <div v-if="editingId === comment.id">
          <textarea
            v-model="editContent"
            class="w-full text-black border rounded-lg px-3 py-2"
          ></textarea>
          <div class="flex space-x-2 mt-2">
            <button
              @click="saveEdit(comment.id)"
              class="bg-green-500 text-white px-3 py-1 rounded-lg"
            >
              <i class="fas fa-check"></i>
            </button>
            <button @click="cancelEdit" class="bg-gray-400 text-white px-3 py-1 rounded-lg">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div v-else>
          <p class="text-black mx-16 mt-2 text-base">{{fctRemoveHTMLTags(comment.content.rendered)}}</p>
        </div>
      </div>
    </div>
    <div v-else class="text-black text-lg flex gap-4 mb-8">
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
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
        />
      </svg>

      No comment yet
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCommentStore } from '@/stores/commentStore'
import { usePostStore } from '@/stores/postStore'

const commentStore = useCommentStore()
const postStore = usePostStore()

const editingId = ref(null)
const editContent = ref('')

const name = ref('')
const commentContent = ref('')

function fctRemoveHTMLTags(text) {
  if (text != null) {
    const p =document.createElement("p")
    p.innerHTML=text.replace(/<[^>]*>/g, '');
    return p.innerText
  }
}
const submitComment = async () => {
  try {
    await commentStore.addComments({
      postId: postStore.selectedDetail?.id,
      content: commentContent.value,
    })
    name.value = ''
    commentContent.value = ''
  } catch (error) {
    console.error('Error', error)
  }
}

onMounted(async () => {
  await commentStore.fetchComment()
})

// commencer la modification
const startEdit = (comment) => {
  editingId.value = comment.id
  editContent.value = fctRemoveHTMLTags(comment.content.rendered)
}

// annuler la modification
const cancelEdit = () => {
  editingId.value = null
  editContent.value = ''
}

// sauvegarder la modification
const saveEdit = async (id) => {
  await commentStore.updateComment(id, editContent.value)
  editingId.value = null
  editContent.value = ''
}

// supprimer un commentaire
const deleteComment = async (id) => {
  await commentStore.suppressComment(id)
}
</script>
