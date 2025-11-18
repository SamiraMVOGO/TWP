<template>
  <main class="flex flex-col h-screen justify-between">
    <HeaderComponent />
    <div class="horizontal-scroll w-[100%]">
      <div class="horizontal-scroll--wrapper box-shadow-left box-shadow-right">
        <div class="horizontal-scroll--content">
          <div
            class="flex-basis bg-[url('../assets/images/hautesmontagnes.jpg')] bg-cover bg-center bg-no-repeat min-h-screen relative"
          >
            <!-- <div class="bg-black absolute top-0 opacity-20 left-0 w-full h-full"></div> -->

            <div  class="mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-6 z-10 pt-10 text-white">
              <div v-for="list in listStore.lists" :key="list.id">
                <div class="z-40">
                  <ListComponent
                    :id="list.id"
                    :name="list.name"
                    :description="list.description"
                    :slug="list.slug"
                  />
                </div>
              </div>

              <div class="z-40">
                <ButtonAddComponent />
              </div>
              <div class="z-40">
                <ButtonSuppressAll/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
  </main>
</template>

<script setup>
import ButtonAddComponent from '@/components/ButtonAddComponent.vue'
import ButtonSuppressAll from '@/components/ButtonSuppressAll.vue'
import ListComponent from '@/components/ListComponent.vue'
import { onMounted } from 'vue'
import { useListStore } from '@/stores/listStore'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { usePostStore } from '@/stores/postStore'
import FooterComponent from '@/components/FooterComponent.vue'

const listStore = useListStore()
const postStore = usePostStore()
onMounted(async () => {
  await listStore.fetchList()
  await postStore.fetchPost()
})
</script>
<style scoped>
.horizontal-scroll {
  position: relative;
  overflow-x: hidden;
}
.horizontal-scroll--wrapper {
  display: flex;
  overflow-x: auto;
}
.horizontal-scroll--wrapper.box-shadow-right:after,
.horizontal-scroll--wrapper.box-shadow-left:before {
  content: '';
  height: calc(100% - 1em);
  width: 10px;
  top: 0;
  position: absolute;
  z-index: 1;
}
.horizontal-scroll--wrapper.box-shadow-right:after {
  right: 0;
}
.horizontal-scroll--wrapper.box-shadow-left:before {
  left: 0;
}
.horizontal-scroll--content {
  flex-grow: 1;
}
</style>
