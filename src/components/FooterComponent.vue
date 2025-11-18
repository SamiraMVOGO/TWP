<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6 text-center md:text-left">
      <h2 class="text-lg font-semibold text-white">Plannify</h2>
      <p class="text-sm mt-2">The best platform to organize you and your team ideas.</p>
    </div>

    <div class="text-center border-t border-gray-700 py-4 text-sm">
      © {{ year }} CMS. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
