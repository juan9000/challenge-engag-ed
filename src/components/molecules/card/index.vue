<template>
  <router-link :to="`/character/${id}`" class="card">
    <img :src="image" :alt="`${name} - image`"/>
    <div class="character-content">
      <div class="name-text">{{ name }}</div>
      <div v-if="status">Life Status: {{ status }}</div>
      <div v-if="location && location.name">Last Location: {{ location.name }}</div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
// Props
defineProps({
  id: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: '',
  },
  location: {
    type: Object,
    default: () => {},
  },
  image: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.card {
  background: rgb(25, 27, 41);
  border-radius: 8px;
  cursor: pointer;
}

img {
  width: -webkit-fill-available;
  border-radius: 8px 8px 0 0;
}

.character-content{
  padding: 0.5rem;
}

.name-text {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}
</style>