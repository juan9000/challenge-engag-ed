<template>
  <div class="character-container">
    <CharacterInfos
      :name="name"
      :status="status"
      :species="species"
      :type="type"
      :gender="gender"
      :origin="origin"
      :location="location"
      :image="image"
    />
    <CharacterEpisodes v-if="episode.length" :episodes="episode" />
  </div>
</template>

<script setup lang="ts">
import type { Episode } from '@/utils/types/generic';

import CharacterInfos from '@/components/molecules/character/infos.vue'
import CharacterEpisodes from '@/components/molecules/character/episodes.vue'

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
  episode: {
    type: Array<Episode>,
    default: () => []
  },
})
</script>

<style scoped>
.character-container {
  background-color: rgb(25, 27, 41);
  padding: 2rem 1rem;
  border-radius: 10px;
}
</style>
