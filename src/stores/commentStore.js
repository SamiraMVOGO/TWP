import { defineStore } from 'pinia'

export const useCommentStore = defineStore('comments', {
  state: () => ({
    commentSuppress: {},
    comments: [],
    user: {},
    loading: false,
    addcomment: false,
    updatecomment: false,
  }),

  getters: {
    totalCountComment: (state) => state.comments.length,

  },

  actions: {
    async fetchComment() {
      this.loading = true
      const url = `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/comments`
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN_JWT} `,
          },
        })
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`)
        }
        const response = await res.json()
       
        this.comments = response
        return this.comments
      } catch (error) {
        console.error('Failed to fetch your comment:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchuser(){

         this.loading = true
      const url = `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/users`
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN_JWT} `,
          },
        })
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`)
        }
        const response = await res.json()
        
        this.user = response
        return this.user
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        this.loading = false
      }
    
    },
    fetchCommentByPost(id) {
      let postcomments = []
      for (let i = 0; i < this.comments.length; i++) {
        if (this.comments[i].post == id) {
          postcomments.push(this.comments[i])
        }
      }
      return postcomments
    },
    isaddcomment() {
      this.addcomment = true
    },

    isupdatecomment() {
      this.updatecomment = true
    },

    async addComments(commentparams) {
      this.loading = true
      const url = `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/comments`
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN_JWT} `,
          },
          body: JSON.stringify({
            post: commentparams.postId,
            content: commentparams.content,
          }),
        })
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`)
        }
        const response = await res.json()
        
        this.comments.push(response)
        return this.comments
      } catch (error) {
        console.error('Failed to create your comment:', error)
      } finally {
        this.loading = false
      }
    },

    async updateComment(id, newContent) {
      this.loading = true
      const url = `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/comments/${id}`
      try {
        const res = await fetch(url, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN_JWT} `,
          },
          body: JSON.stringify({
            content: newContent,
          }),
        })
        if (!res.ok) throw new Error(`Response status: ${res.status}`)
        const response = await res.json()
        
        // mettre à jour localement
        this.comments = this.comments.map((c) => (c.id === id ? response : c))
        return response
      } catch (error) {
        console.error('Failed to update comment:', error)
      } finally {
        this.loading = false
      }
    },

    async storeSuppressComment(id, name) {
      this.commentSuppress = { id, name }
    },

    deleteCommentStore(id) {
      this.comments = this.comments.filter((comment) => comment.id !== id)
    },

    fetchStoreComment() {
      return this.comments
    },

    async suppressComment(id) {
     
      this.loading = true
      const url = `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/comments/${id}?force=true`
      try {
        const res = await fetch(url, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN_JWT} `,
          },
        })
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`)
        }
        const response = await res.json()
        
        this.comments = this.comments.filter((c) => c.id !== id)
        return response
      } catch (error) {
        console.error('Failed to delete your comment:', error)
      } finally {
        this.loading = false
      }
    },
  },
  persist: true,
})
