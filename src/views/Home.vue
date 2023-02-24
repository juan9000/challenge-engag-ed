<template>
  <SearchBar @changeFilter="changeFilter"/>
  <div>
    <div v-if="loading">
      Loading
    </div>

    <template v-else-if="characters.length">
      <CharactersList :characters="characters" />
      <div v-if="infos && infos.pages > 1">
        {{ infos }}
      </div>
      <div @click="changePage()">
        {{ page }}
      </div>
    </template>

    <div v-else class="not-found">
      Character not found ;-;
    </div>
  </div>
</template>

<script setup lang="ts">
import gql from 'graphql-tag';
import type { DocumentNode } from 'graphql';
import { computed, ref, type Ref } from 'vue'
import { useQuery } from '@vue/apollo-composable';
import type { CharactersResult, FilterCharacter } from '@/utils/types/generic';
import SearchBar from '@/components/organisms/search-bar/index.vue'
import CharactersList from '@/components/organisms/characters-list/index.vue'

// Query
const charactersQuery: DocumentNode = gql`
  query ($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        id,
        name,
        status,
        location {
          name
        },
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
const characters = computed((): Array<CharactersResult> => { 
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

<style scoped>
.not-found {}
</style>