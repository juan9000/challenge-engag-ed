<template>
  <div class="search-bar-container">
    search bar
    <input
      v-model="inputText"
      type="text"
      @input="inputTextInterval()"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';

// Emits
const emit = defineEmits<{ (e: 'changeFilter', value: string): void }>()

// Variables
let interval: number | undefined = undefined
const inputText: Ref<string> = ref('')

// Methods
const inputTextInterval = (): void => {
  const intervalTime: number = 500 // 0.5 seconds in miliseconds 
  clearInterval(interval)
  interval = setInterval(() => {
    emit('changeFilter', inputText.value)
    clearInterval(interval)
  }, intervalTime)
}
</script>

<style scoped>
</style>