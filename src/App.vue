<template>
  <div class="bg-gray-100 min-h-screen text-gray-900 px-4">
    <header class="sticky w-full z-10" style="top: 1.5rem;">
      <nav
        class="flex rounded-lg bg-gray-100 sm:border shadow-xl h-16 items-center overflow-hidden"
      >
        <button class="bg-primary h-full px-6 z-10 focus:outline-none">
          <svg
            class="text-white h-6"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h7"></path>
          </svg>
        </button>
        <router-link
          tag="h1"
          to="/"
          class="cursor-pointer px-2 pl-6 h-full flex items-center font-semibold text-xl sm:text-2xl hover:bg-primary active:bg-primary hover:text-white transition-colors duration-200"
          >eVerbandbuch</router-link
        >
        <span class="flex-1"></span>
        <router-link
          to="/list"
          class="cursor-pointer text-lg font-medium flex items-center px-6 h-full hover:bg-primary active:bg-primary hover:text-white transition-colors duration-200"
          >Übersicht</router-link
        >
      </nav>
    </header>
    <main class="navbar-spacer">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style scoped>
.navbar-spacer {
  margin-top: calc(theme("spacing.16"));
  @screen lg {
    margin-top: calc(64px + 2rem);
  }
}
</style>
