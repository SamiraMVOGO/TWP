import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostStore = defineStore('postStore', {
  state: () => ({
    postSuppress: {},
    posts: [],
    selectedDetail: {},
    selectedPostUpdate: {},
    loading: false,
    idpostDetail: ref({}),
    idpostUpdate: ref({}),
  }),
  getters: {
    getPostById(state) {
      return (id) => state.posts.find((post) => post.id === parseInt(id))
    },
  },
  actions: {
    async addPost(postparams) {
      this.loading = true
      const url = `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts`
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN_JWT} `,
          },
          body: JSON.stringify({
            title: postparams.title,
            content: postparams.content,
            status: postparams.status,
            categories: postparams.categories,
          }),
        })
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`)
        }
        const response = await res.json()
        this.fetchPost()


        return response
      } catch (error) {
        console.error('Failed to create post:', error)
      } finally {
        this.loading = false
      }
    },

    fetchPostBylist(id) {
      let listpost = []
      for (let i = 0; i < this.posts.length; i++) {
        if (this.posts[i]?.categories[0] == id) {
          listpost.push(this.posts[i])
        }
      }
      return listpost
    },
    clearSuppressPost() {
      this.postSuppress = {}
    },
    async storeSuppressPost(id, name) {
      this.postSuppress = { id, name }
    },
    deletePostStore(id) {
      this.posts = this.posts.filter((post) => post.id !== id)
    },
   async updatePostCategory(id) {
      for (var i = 0; i < this.posts.length; i++) {
        if (this.posts[i].categories[0] === id) {
          this.posts[i].categories = [1]
        }
      }
    },

    storePostDetail(id) {
      return (this.selectedDetail = this.getPostById(id))
    },
    storePostUpdate(id) {
      return (this.selectedPostUpdate = this.getPostById(id))
    },
    storeIdPost(id) {
      this.idpostDetail.value = id
    },
    addPostUpdateStore(updatepost) {
      this.posts.push(updatepost)
    },
    clearIdPost() {
      this.idpostDetail = {}
    },
    storeIdUpdatePost(id) {
      this.idpostUpdate.value = id
    },
    clearIdUpdatePost() {
      this.idpostUpdate.value = {}
    },
    deletePostUpdateStore(id) {
      this.posts = this.posts.filter((post) => post.id !== id)
    },
    clearPostDetail(id) {
      return this.selectedDetail = {}
    },
    updatePostTitle(id, title) {
      for (var i = 0; i < this.posts.length; i++) {
        if (this.posts[i].id === id) {
          this.posts[i].id = title
        }
      }
    },
    async fetchPost() {
      //this.loading = true
      const url = `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts?per_page=100`
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

        this.posts = response
        return this.posts
      } catch (error) {
        console.error('Failed to fetch post:', error)
      } finally {
        //this.loading = false
      }
    },
    async fetchPostById(id) {
      //this.loading = true
      const url = `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts/` + id
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
        const onePost = await res.json()

        this.selectedPost = onePost


        return this.selectedPost
      } catch (error) {
        console.error('Failed to fetch post by Id:', error)
      } finally {
        //this.loading = false
      }
    },
    async updatePostName(id, updatename) {
      this.loading = true
      const url = `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts/${id}`
      try {
        const res = await fetch(url, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN_JWT} `,
          },
          body: JSON.stringify({
            title: updatename.title,
          }),
        })
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`)
        }
        const updatedPost = await res.json()
        this.deletePostUpdateStore(id)

        this.addPostUpdateStore(updatedPost)
        return this.posts
      } catch (error) {
        console.error('Failed to update post name:', error)
      } finally {
        this.loading = false
      }
    },
    async updatePost(id, postparams) {
      const url = `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts/` + id
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN_JWT} `,
          },
          body: JSON.stringify({
            title: postparams.title,
            content: postparams.content,
            status: postparams.status,
            categories: postparams.categories,
          }),
        })
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`)
        }
        const updatedPost = await res.json()
        //console.log(' updatedPost:', updatedPost)
        await this.fetchPost()

        this.posts = this.posts.map((post) => (post.id == updatedPost.id ? updatedPost : post))
        return updatedPost
      } catch (error) {
        console.error('Failed to update post:', error)
        // } finally {
        //   //this.loading = false
        // }
      }
    },
    async suppressPost(id) {

      this.loading = true
      const url = `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts/${id}?force=true`
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

        return response
      } catch (error) {
        console.error('Failed to delete post:', error)
      } finally {
        this.loading = false
      }
    },
  },
  persist: true,
})
