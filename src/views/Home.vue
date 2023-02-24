<template>
  <div>
    <SearchBar @changeFilter="changeFilter"/>
    <div v-if="loading" class="loading-container">
      <LoadingSpin class="loading-spin"></LoadingSpin>
    </div>

    <template v-else-if="characters.length">
      <CharactersList :characters="characters" />
      <Pagination :current-page="page" v-bind="infos"  @changePage="changePage"/>
    </template>

    <NotFound v-else />
  </div>
</template>

<script setup lang="ts">
import gql from 'graphql-tag';
import router from '@/router';
import { useRoute } from 'vue-router';
import type { DocumentNode } from 'graphql';
import { useQuery } from '@vue/apollo-composable';
import { computed, ref, watch, type Ref } from 'vue'
import type { Character, FilterCharacter } from '@/utils/types/generic';

import NotFound from '@/components/atoms/not-found/index.vue'
import SearchBar from '@/components/organisms/search-bar/index.vue'
import LoadingSpin from '@/components/atoms/icons/loading-spin.vue'
import Pagination from '@/components/organisms/pagination/index.vue'
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
const characters = computed((): Array<Character> => { 
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
const changePage = (value: number): void => {
  page.value = value
}

// Request Data
const { result, loading } = useQuery(charactersQuery, {
    page,
    filter
  }
)

// Watch
watch(
  () => page.value,
  (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
      if (filter.value.name) {
        router.replace({ query: { page: newVal, name: filter.value.name}})
      } else {
        router.replace({ query: { page: newVal }})
      }
    } 
  }
)
watch(
  () => filter.value,
  (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
      page.value = 1
      if (newVal.name) {
        router.replace({ query: { page: page.value, name: newVal.name}})
      } else {
        router.replace({ query: { page: page.value }})
      }
    }
  },
  {
    deep: true
  }
)
</script>

<style scoped>
.loading-container {
  text-align: center;
}
.loading-spin {
  width: 20rem
}
</style>