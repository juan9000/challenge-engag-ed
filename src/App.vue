<template>
  <div class="page-container">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from './apollo-client';

provideApolloClient(apolloClient)
</script>

<style scoped>
.page-container {
  margin: 0 2rem;
}
</style>
