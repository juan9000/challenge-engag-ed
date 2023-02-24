<template>
  <div class="loading-container">
    <LoadingSpin class="loading-spin"></LoadingSpin>
  </div>
</template>

<script setup lang="ts">
import LoadingSpin from '@/components/atoms/icons/loading-spin.vue'
</script>

<style scoped>
.loading-container {
  text-align: center;
}

.loading-spin {
  width: 20rem
}
</style>
