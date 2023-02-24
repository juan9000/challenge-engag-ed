<template>
  <div class="pagination-container">

    <div v-if="prev" class="prev-arrow-container arrow-container-size" @click="changePage(prev)">
      <RightArrow
        class="prev-arrow"
      >
        {{ prev }}
      </RightArrow>
    </div>

    <div class="page-selector-container">
      <template
        v-if="pagesToRender.length && pagesToRender[0] > 1"
      >
        <div
          class="page-button font-size"
          @click="changePage(1)"
        >
          1
        </div>
        <p class="page-separator font-size">...</p>
      </template>

      <div
        v-for="(page, index) in pagesToRender"
        :key="`${page}-${index}`"
        :class="[{'active': page === currentPage}, 'page-button font-size']"
        @click="changePage(page)"
      >
        {{ page }}
      </div>

      <template
        v-if="pagesToRender.length && pagesToRender[pagesToRender.length - 1] < pages"
      >
        <p class="page-separator font-size">...</p>
        <div
          class="page-button font-size"
          @click="changePage(pages)"
        >
          {{ pages }}
        </div>
      </template>
    </div>

    <div v-if="next" class="next-arrow-container arrow-container-size" @click="changePage(next)">
      <RightArrow
        class="next-arrow"
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
  margin-top: 2rem;
}

.page-selector-container{
  display: flex;
  justify-content: center;
}

.font-size {
  font-size: 3rem
}

.page-button {
  cursor: pointer;
  text-align: center;
  border: 1px solid white;
  border-radius: 6px;
  min-width: 48px;
  margin: 0 0.5rem;
  padding: 0.25rem;
}
.page-button:hover {
  background-color: rgb(25, 27, 41);
}
.page-button.active {
  cursor: default;
  border-color: rgb(21 124 0);
  color: rgb(21 124 0);
}
.page-button.active:hover {
  background-color: unset;
}

.page-separator {
  margin: 0 0.5rem;
}

.arrow-container-size {
  min-width: 48px;
  min-height: 48px;
}

.prev-arrow-container {
  display: flex;
  cursor: pointer;
  text-align: center;
  border: 1px solid white;
  border-radius: 6px;
  margin-right: 1rem;
  padding: 0.25rem;
}
.prev-arrow-container:hover {
  background-color: rgb(25, 27, 41);;
}
.prev-arrow {
  width: 30px;
  margin: auto;
  transform: rotate(180deg);
}

.next-arrow-container {
  display: flex;
  cursor: pointer;
  text-align: center;
  border: 1px solid white;
  border-radius: 6px;
  margin-left: 1rem;
  padding: 0.25rem;
}
.next-arrow-container:hover {
  background-color: rgb(25, 27, 41);;
}
.next-arrow {
  width: 30px;
  margin: auto;
}

@media screen and (max-width: 900px) { 
  .font-size {
    font-size: 1.5rem;
  }
  .page-button {
    min-width: 24px;
    margin: 0 0.25rem;
  }

  .page-separator {
    margin: 0;
  }

  .arrow-container-size{
    min-width: 24px;
    min-height: 24px;
  }

  .prev-arrow-container {
    margin-right: 0.25rem;
  }
  .prev-arrow {
    width: 16px;
  }

  .next-arrow-container {
    margin-left: 0.25rem;
  }
  .next-arrow {
    width: 16px;
  }
}

@media screen and (max-width: 480px) {
  .pagination-container {
    flex-wrap: wrap;
    margin-top: 1rem;
  }
  .page-selector-container {
    flex-wrap: wrap;
  }
  .arrow-container-size {
    margin-bottom: 0.5rem;
    margin-left: auto;
    margin-right: auto;
    max-width: 24px;
  }
  .page-button {
    margin-bottom: 0.5rem;
  }

}
</style>