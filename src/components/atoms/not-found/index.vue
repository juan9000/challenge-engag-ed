<template>
  <div class="not-found-text">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
// Props
defineProps({
  text: {
    type: String,
    default: 'Character not found ;-;'
  }
})
</script>

<style scoped>
.not-found-text {
  text-align: center;
  font-size: 4rem;
  margin-top: 10rem;
}
</style>