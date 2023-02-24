<template>
  <router-view />
</template>

<script setup lang="ts">
import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from './apollo-client';

provideApolloClient(apolloClient)
</script>
