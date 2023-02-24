<template>
  <div class="pagination-container">

    <div v-if="prev" class="prev-button-container" @click="changePage(prev)">
      <RightArrow
        class="prev-button"
      >
        {{ prev }}
      </RightArrow>
    </div>

    <div class="page-selector-container">
      <template
        v-if="pagesToRender.length && pagesToRender[0] > 1"
      >
        <div
          class="page-button"
          @click="changePage(1)"
        >
          1
        </div>
        <p class="page-separator">...</p>
      </template>

      <div
        v-for="(page, index) in pagesToRender"
        :key="`${page}-${index}`"
        :class="[{'active': page === currentPage}, 'page-button']"
        @click="changePage(page)"
      >
        {{ page }}
      </div>

      <template
        v-if="pagesToRender.length && pagesToRender[pagesToRender.length - 1] < pages"
      >
        <p class="page-separator">...</p>
        <div
          class="page-button"
          @click="changePage(pages)"
        >
          {{ pages }}
        </div>
      </template>
    </div>

    <div v-if="next" class="next-button-container" @click="changePage(next)">
      <RightArrow
        class="next-button"
      >
        {{ next }}
      </RightArrow>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import RightArrow from '@/components/atoms/icons/right-arrow.vue'

// Props
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  pages: {
    type: Number,
    default: null
  },
  next: {
    type: Number,
    default: null
  },
  prev: {
    type: Number,
    default: null
  }
})

// Emit
const emit = defineEmits<{ (e: 'changePage', value: number): void }>()

// Computed
const pagesToRender = computed(() => {
  if (props.pages && props.pages > 1) {
    const pagesToRender: Array<number> = [props.currentPage]
    const beforeAfterPagesToDisplay = 2 // Amount of pages to display before and after the current page

    for (let x = 1; x <= beforeAfterPagesToDisplay; x++) {
      if (props.currentPage - x >= 1) {
        pagesToRender.unshift(props.currentPage - x)
      }
      if (props.currentPage + x <= props.pages) {
        pagesToRender.push(props.currentPage + x)
      }
    }

    return pagesToRender
  } 
  return [1]
})

// Methods
const changePage = (page: number): void => {
  if (page !== props.currentPage) {
    emit('changePage', page)
  }
}
</script>

<style scoped>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
}
.page-selector-container{
  display: flex;
  justify-content: center;
}
.page-button {
  cursor: pointer;
  text-align: center;
  border: 1px solid white;
  border-radius: 6px;
  font-size: 3rem;
  min-width: 48px;
  margin: 0 0.5rem;
  padding: 0.25rem;
}
.page-button.active {
  cursor: default;
  border-color: rgb(21 124 0);
  color: rgb(21 124 0);
}
.page-separator {
  margin: 0 0.5rem;
  font-size: 3rem;
}
.prev-button-container {
  display: flex;
  cursor: pointer;
  text-align: center;
  border: 1px solid white;
  border-radius: 6px;
  min-width: 48px;
  min-height: 48px;
  margin-right: 1rem;
  padding: 0.25rem;
}
.prev-button {
  width: 30px;
  height: 30px;
  font-size: 3rem;
  margin: auto;
  transform: rotate(180deg);
}
.next-button-container {
  display: flex;
  cursor: pointer;
  text-align: center;
  border: 1px solid white;
  border-radius: 6px;
  min-width: 48px;
  min-height: 48px;
  margin-left: 1rem;
  padding: 0.25rem;
}
.next-button {
  width: 30px;
  height: 30px;
  font-size: 3rem;
  margin: auto;
}
</style>