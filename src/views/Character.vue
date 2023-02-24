<template>
  <div v-if="loading" class="loading-container">
    <LoadingSpin class="loading-spin"></LoadingSpin>
  </div>
  <div v-else-if="character">
    <div> character page {{ $route.params }}</div>
    <div> {{ character }} </div>
  </div>
  <NotFound v-else />
</template>

<script setup lang="ts">
import gql from 'graphql-tag';
import { useRoute } from 'vue-router';
import type { DocumentNode } from 'graphql';
import { type Ref, ref, computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import type { Character } from '@/utils/types/generic';

import NotFound from '@/components/atoms/not-found/index.vue'
import LoadingSpin from '@/components/atoms/icons/loading-spin.vue'

// Query
const characterQuery: DocumentNode = gql`
  query ($id: ID!) {
    character(id: $id) {
      id,
      name,
      status,
      species,
      type,
      gender,
      origin {
        name,
        type,
        dimension
      },
      location {
        name,
        type,
        dimension
      },
      image,
      episode {
        id,
        name,
        air_date,
        episode
      }
    }
  }
`

// Variables
const route = useRoute()
const id: Ref<number> = ref(route.params?.id ? +route.params.id : 0)

// Computed
const character = computed((): Character | null => { 
  return result.value?.character || null
})
  
// Request Data
const { result, loading } = useQuery(characterQuery, {
    id,
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