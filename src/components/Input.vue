<template>
  <div class="break-words">
    <label v-if="label" :for="id" class="text-gray-600 text-sm">
      {{ label }}
    </label>
    <div
      :class="{ 'mt-6': !label }"
      class="flex items-center bg-white shadow-sm rounded border border-gray-300 focus-within:border-gray-400 transition-colors duration-200 input"
    >
      <div v-if="$slots.icon" class="px-2 border-r" @click="$refs[id].focus()">
        <slot name="icon" />
      </div>
      <input
        :id="id"
        :ref="id"
        :class="{
          'cursor-not-allowed': $attrs.disabled !== undefined
        }"
        class="text-base block px-3 py-2 rounded placeholder-gray-400 w-full focus:outline-none"
        @input="$emit('input', $event.target.value)"
        :value="value"
        v-bind="$attrs"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      />
      <div v-if="$slots.after" class="px-2 border-l cursor-pointer">
        <slot name="after" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { nanoid } from "nanoid";
export default Vue.extend({
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    id: nanoid()
  }),
  methods: {
    log(e: any) {
      console.log(e);
    }
  }
});
</script>
