<template>
  <div>
    {{ result }}
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const GET_ALL_CHARACTERS = gql`
  query {
    characters(page: 1) {
      results {
        name
      }
    }
  }
`
const { result } = useQuery(GET_ALL_CHARACTERS)
console.log(result.value)
</script>


<style scoped>
</style>
