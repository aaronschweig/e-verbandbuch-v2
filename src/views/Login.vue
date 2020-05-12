<template>
  <div class="max-w-xl space-y-4">
    Mit AMS-Account (für einen Standort, <b>kein Management!</b>) einloggen
    <ev-input
      label="Email"
      placeholder="max@musterman.de"
      type="email"
      v-model="email"
      required
    >
      <template #icon>
        <svg
          class="h-6"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
          ></path>
        </svg>
      </template>
    </ev-input>
    <ev-input
      label="Passwort"
      placeholder="********"
      type="password"
      v-model="password"
      required
    >
      <template #icon>
        <svg
          class="h-6"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          ></path>
        </svg>
      </template>
    </ev-input>
    <ev-button @click="login">
      Login!
    </ev-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { useQuery, persistToken } from "../use/useQuery";
export default Vue.extend({
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    async login() {
      try {
        const { login } = await useQuery(
          `
          query login {
            login(email: "${this.email}", password: "${this.password}") {
              token
              name
            }
          }
        `,
          "https://dev.ams-pro.de/api/graphql"
        );
        persistToken(login.token);
        this.$router.push({ name: "home" });
      } catch (error) {
        alert("Falsches Passwort");
      }
    }
  }
});
</script>
