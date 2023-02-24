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
import router from '@/router';
import { useRoute } from 'vue-router';
import type { DocumentNode } from 'graphql';
import { useQuery } from '@vue/apollo-composable';
import { computed, ref, watch, type Ref } from 'vue'
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
const route = useRoute()
const page: Ref<number> = ref(route.query?.page ? +route.query.page : 1)
const filter: Ref<FilterCharacter> = ref({ name: route.query?.name ?  route.query.name.toLocaleString() : '' })

// Computed
const characters = computed((): Array<CharactersResult> => { 
  return result.value?.characters?.results || []
})
const infos = computed((): any => {
  return result.value?.characters?.info || null
})

// Methods
const changeFilter = (input: string): void => {
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

// this.$router.replace({ query: { q1: "q1" } })
watch(
  () => page.value,
  (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
      router.replace({ query: { page: newVal, name: filter.value.name}})
    } 
  }
)
watch(
  () => filter.value,
  (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
      router.replace({ query: { page: page.value, name: newVal.name}})
    }
  },
  {
    deep: true
  }
)
</script>

<style scoped>
</style>