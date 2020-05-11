<template>
  <button
    v-on="$listeners"
    class="px-4 py-2 rounded shadow bg-teal-400 uppercase text-white border active:bg-teal-500 focus:outline-none hover:bg-teal-500 transition-colors duration-200"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
