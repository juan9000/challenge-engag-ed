<template>
  <div class="search-bar-container">
    <input
      v-model="inputText"
      type="text"
      placeholder="Search character by name"
      @input="inputTextInterval()"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';

// Emits
const emit = defineEmits<{ (e: 'changeFilter', value: string): void }>()

// Variables
const route = useRoute()
let interval: number | undefined = undefined
const inputText: Ref<string> = ref(route.query?.name ?  route.query.name.toLocaleString() : '')

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
input {
  color: #cacaca;
  background: rgb(25, 27, 41);
  border-radius: 10px;
  font-size: 2rem;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  width: -webkit-fill-available;
}
</style>