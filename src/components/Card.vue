<template>
  <div
    class="flex flex-col my-3 px-6 py-3 bg-primary w-full rounded-md active:bg-hover"
    @click="toggleExpand"
  >
    <!-- HEADER -->
    <div class="flex items-center justify-between">
      <div>
        <h4 class="text-gray-900 text-xl font-medium">{{ name }}</h4>
        <p class="text-sm font-light text-gray-700">{{ date | format }}</p>
      </div>
      <svg
        v-if="isExpanded"
        @click="toggleExpand"
        class="h-8 text-white border border-white rounded"
        viewBox="0 0 32 32"
      >
        <path
          d="M26.667 16H5.333M16 5.333v21.334V5.333z"
          stroke="#fff"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div
      class="flex items-center justify-between mt-5"
      :class="{ 'flex-col': isExpanded }"
    >
      <!-- Expanded Details -->
      <div class="flex flex-col w-full" v-if="isExpanded">
        <span class="text-gray-700 text-xs font-light mt-4"
          >Umfang der Verletzung</span
        >
        <p class="text-gray-900 font-light text-base">
          {{ umfang }}
        </p>
        <span class="text-gray-700 text-xs font-light mt-6">Unfallhergang</span>
        <p class="text-gray-900 font-light text-base">
          {{ hergang }}
        </p>
      </div>
      <p
        v-if="!isExpanded"
        class="text-gray-900 mr-auto font-light text-base truncate"
        style="max-width: 10rem;"
      >
        {{ umfang }}
      </p>
      <span class="text-gray-700 text-xs font-light ml-auto">{{ footer }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { useDateFormatter } from "@/use/useDateFormatter";
export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true
    },
    date: {
      type: String,
      default: new Date().toISOString()
    },
    umfang: {
      type: String,
      default: ""
    },
    hergang: {
      type: String,
      default: ""
    },
    // Wird eh zur computed zum anzeigen
    footer: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    isExpanded: false
  }),
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    }
  },
  filters: {
    format(val: string) {
      const date = new Date(val);
      return useDateFormatter({ withTime: false }).format(date);
    }
  }
});
</script>
