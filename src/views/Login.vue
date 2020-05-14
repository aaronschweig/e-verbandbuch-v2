<template>
  <div class="flex md:justify-end md:mx-20 md:px-20">
    <form
      @submit.prevent="login"
      class="max-w-xl md:w-2/5 space-y-4 bg-white rounded shadow p-8"
    >
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
        :type="passwordVisible ? 'text' : 'password'"
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
        <template #after>
          <svg
            v-if="!passwordVisible"
            @click="passwordVisible = !passwordVisible"
            class="h-6"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            ></path>
          </svg>
          <svg
            v-else
            @click="passwordVisible = !passwordVisible"
            class="h-6"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            ></path>
          </svg>
        </template>
      </ev-input>
      <div class="flex justify-center">
        <ev-button
          @click="login"
          type="submit"
          class="w-2/3 flex items-center justify-center space-x-4"
        >
          <span>
            Login!
          </span>
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
              d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
            ></path>
          </svg>
        </ev-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { useQuery, persistToken } from "../use/useQuery";
export default Vue.extend({
  data: () => ({
    email: "",
    password: "",
    passwordVisible: false
  }),
  methods: {
    async login() {
      try {
        const { login } = await useQuery(
          `
          query login {
            login(email: "${this.email.replace(
              /"/,
              '"'
            )}", password: "${this.password.replace(/"/, '"')}") {
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
