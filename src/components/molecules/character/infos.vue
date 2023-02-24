<template>
  <div class="infos-container">
    <img :src="image" :alt="`${name} - image`">
    <div class="detail-container">
      <h1> {{ name }} </h1>
      <div v-if="species">
        Specie: {{ species }}
      </div>
      <div v-if="status">
        Life Status: {{ status }}
      </div>
      <div v-if="type">
        Type: {{ type }}
      </div>
      <div v-if="gender">
        Gender: {{ gender }}
      </div>
      <div
        v-if="origin.name || origin.type || origin.dimension"
        class="location-container"
      >
        Origin
        <div v-if="origin.name">Name: {{ origin.name }}</div>
        <div v-if="origin.type">Type: {{ origin.type }}</div>
        <div v-if="origin.dimension">Dimension: {{ origin.dimension }}</div>
      </div>
      <div
        v-if="location.name || location.type || location.dimension"
        class="location-container"
      >
        Location
        <div v-if="location.name">Name: {{ location.name }}</div>
        <div v-if="location.name">Type: {{ location.type }}</div>
        <div v-if="location.name">Dimension: {{ location.dimension }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
defineProps({
  name: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  },
  species: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    default: ''
  },
  origin: {
    type: Object,
    default: null
  },
  location: {
    type: Object,
    default: null
  },
  image: {
    type: String,
    default: ''
  },
})
</script>

<style scoped>
.infos-container {
  display: flex;
}

img {
  max-width: 300px;
  width: 100%;
}

.detail-container {
  width: 100%;
  margin-left: 1rem;
  line-height: 1.3;
  font-size: 1.1rem;
}

h1 {
  font-size: 2.5rem;
  line-height: 1;
  margin-bottom: 1rem;
}

.location-container {
  margin-top: 0.5rem;
}

.location-container div {
  margin-left: 0.5rem;
}

@media screen and (max-width: 900px) {
  .infos-container {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .detail-container {
    margin: 1.5rem 0 0 0;
    text-align: center;
  }
}

@media screen and (max-width: 480px) {
  h1 {
    font-size: 2rem;
  }
}
</style>