<template>
  <div class="page-container">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from './apollo-client';

// Provide Apollo for all components
provideApolloClient(apolloClient)
</script>

<style scoped>
.page-container {
  margin: 3rem 2rem;
}

@media screen and (max-width: 480px) {
  .page-container{
    margin: 2rem 1rem;;
  }
}
</style>
