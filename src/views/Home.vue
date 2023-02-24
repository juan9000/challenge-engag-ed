<template>
  <SearchBar @changeFilter="changeFilter"/>
  <div>
    <div v-if="loading">
      Loading
    </div>
    <template v-if="characters.length">
      <router-link :to="`/character/${characters[0].id}`" >
        {{ characters[0] }}
      </router-link>
    </template>
    <div v-if="infos && infos.pages > 1">
      {{ infos }}
    </div>
    <div @click="changePage()">
      {{ page }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed, ref, type Ref } from 'vue'
import type { DocumentNode } from 'graphql';
import SearchBar from '@/components/organisms/search-bar/index.vue'
import type { FilterCharacter } from '@/utils/types/generic';

// Query
const charactersQuery: DocumentNode = gql`
  query ($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        id,
        name,
        status,
        species,
        type,
        gender,
        image
      }
      info {
        pages,
        next,
        prev
      }
    }
  }
`

// Variables
const page: Ref<number> = ref(1)
const filter: Ref<FilterCharacter> = ref({ name: '' })

// Computed
const characters = computed((): any => { 
  return result.value?.characters?.results || []
})
const infos = computed((): any => {
  return result.value?.characters?.info || null
})

// Methods
const changeFilter = (input: string): void => {
  console.log(input)
  filter.value = {
    name: input
  }
}
const changePage = (): void => {
  page.value++
}

// Request Data
const { result, loading } = useQuery(charactersQuery, {
    page,
    filter
  }
)
</script>
