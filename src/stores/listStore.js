import { defineStore } from 'pinia'
// import { createPinia } from 'pinia'
// import { usePostStore } from './postStore'
// const postStore = usePostStore(createPinia())
export const useListStore = defineStore('lists', {
  state: () => ({
    listSuppress: {},
    lists: [],
    loading: false,
    addlist: false,
    addpost: false,
  }),
  getters: {
    totalCountList: (state) => state.lists.length,
  },
  actions: {
    async fetchList() {
      this.loading = true
      const url = `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/categories?per_page=100`
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

        this.lists = response

        return this.lists
      } catch (error) {
        console.error('Failed to fetch list:', error)
      } finally {
        this.loading = false
      }
    },

    isaddlist() {
      this.addlist = true
    },

    isaddpost() {
      this.addpost = true
    },
    async addList(listparams) {
      this.loading = true
      const url = `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/categories`
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN_JWT} `,
          },
          body: JSON.stringify({
            name: listparams.name,
            description: listparams.description,
            slug: listparams.slug,
          }),
        })
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`)
        }
        const response = await res.json()
        await this.fetchList()
        return response
      } catch (error) {
        console.error('Failed to create list:', error)
      } finally {
        this.loading = false
      }
    },
    async updateList(id, listparams) {
      this.loading = true
      const url = `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/categories/${id}`
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN_JWT} `,
          },
          body: JSON.stringify({
            name: listparams.name,
            description: listparams.description,
            slug: listparams.slug,
          }),
        })
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`)
        }
        const response = await res.json()
        await this.fetchList()

        return response
      } catch (error) {
        console.error('Failed to update list:', error)
      } finally {
        this.loading = false
      }
    },
    clearSuppressList() {
      this.listSuppress = {}
    },
    async storeSuppressList(id, name) {
      this.listSuppress = { id, name }
    },
    addListStore(updatelist) {
      this.lists.push(updatelist)
    },
    deleteListStore(id) {
      this.lists = this.lists.filter((list) => list.id !== id)
    },
    fetchStoreList() {
      return this.lists
    },

    async suppressList(id) {
      this.loading = true
      const url = `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/categories/${id}?force=true`
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
        await this.fetchList()

        return response
      } catch (error) {
        console.error('Failed to delete list:', error)
      } finally {
        this.loading = false
      }
    },
    // async suppressAllList() {
    //   this.loading = true

    //   try {
    //     for (var i = 0; i < this.lists.length; i++) {
        
    //       if (this.lists[i]?.id !== 1) {
    //         console.log("DANS ",this.lists[i]?.id)
    //         if (this.lists[i]?.count !== 0) {
    //           postStore.updatePostCategory(this.lists[i]?.id)
    //         }
    //         this.deleteListStore(this.lists[i]?.id)
    //         await this.suppressList(this.lists[i]?.id)
    //         await this.fetchList()
    //       }
    //         console.log(this.lists[i]?.id)
    //     }
    //   } catch (error) {
    //     console.error('Failed to delete all list:', error)
    //   } finally {
    //     this.loading = false
    //   }
    // },
  },
  persist: true,
})
