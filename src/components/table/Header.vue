<template>
  <th class="w-1/6 pb-3 cursor-pointer" v-on="$listeners">
    <div class="flex space-x-4 items-center">
      <span>
        <slot />
      </span>
      <transition name="fade">
        <svg
          v-if="state.key === sortKey && state.order.matches('DESC')"
          class="h-5"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
        <svg
          v-else-if="state.key === sortKey && state.order.matches('ASC')"
          class="h-5"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </transition>
    </div>
  </th>
</template>

<script lang="ts">
import Vue from "vue";
import { Verbandbuch } from "@/types";
export default Vue.extend({
  props: {
    state: {
      type: Object,
      required: true
    },
    sortKey: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
