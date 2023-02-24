<template>
  <div class="episode-component-container">
    <h2>{{ episodes.length > 1 ? 'Episodes' : 'Episode' }}</h2>
    <div>
      <p v-for="(episode, index) in episodes" :key="`${episode.name} - ${index}`">
        {{ episode.name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Episode } from '@/utils/types/generic';

// Props
defineProps({
  episodes: {
    type: Array<Episode>,
    required: true
  }
})
</script>

<style scoped>
.episode-component-container {
  width: 100%;
  text-align: center;
}

h2 {
  font-size: 2.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}

p {
  width: 100%;
  line-height: 1.5;
}

@media screen and (max-width: 480px) {
  h2 {
    font-size: 2rem;
  }
}
</style>