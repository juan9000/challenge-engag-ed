<template>
  <div>
    <template v-if="characters.length">
      <router-link :to="`/character/${characters[0].id}`" >
        {{ characters[0] }}
      </router-link>
    </template>

    <!-- <router-link v-for="character in result.value.characters.results" :to="`/character/${character.id}`">
      <div>
        {{ character.id }}
      </div>
      <div>
        {{ character.name }}
      </div>
    </router-link> -->
    <div v-if="infos && infos.pages > 1">
      {{ infos }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed } from 'vue'

const GET_ALL_CHARACTERS = gql`
  query {
    characters(page: 1, filter: { name: "Rick" }) {
      results {
        id,
        name,
        status,
        species,
        type,
        gender,
        image,
      }
      info {
        pages,
        next,
        prev
      }
    }
  }
`
const { result } = useQuery(GET_ALL_CHARACTERS)
const characters = computed((): any => { 
  return result?.value?.characters?.results || [] 
})
const infos = computed((): any => { 
  return result?.value?.characters?.info || null 
})
</script>