<template>
  <textarea
    class="h-48 mt-5 sm:mt-8 p-4 text-base block rounded w-full bg-white border border-gray-300 placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none"
    cols="30"
    rows="10"
    style="resize: none"
    v-text="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    value: {
      type: String,
      default: ""
    }
  }
});
</script>
