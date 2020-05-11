<template>
  <button
    v-on="$listeners"
    class="px-4 py-2 rounded shadow bg-primary uppercase text-white border active:bg-hover focus:outline-none hover:bg-hover transition-colors duration-200"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
