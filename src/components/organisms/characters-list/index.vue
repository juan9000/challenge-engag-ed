<template>
  <div class="characters-list-container">
    <CharacterCard v-for="(character, index) in characters" class="card" :key="`${index}-${character.id}`" v-bind="character"/>
  </div>
</template>

<script setup lang="ts">
import type { CharactersResult } from '@/utils/types/generic';
import CharacterCard from '@/components/molecules/card/index.vue'

defineProps({
  characters: {
    type: Array<CharactersResult>,
    required: true,
  },
})
</script>

<style scoped>
.characters-list-container {
  display: grid;
  grid-template-columns: repeat(4,minmax(0,1fr));
  grid-gap: 2rem;
}
</style>