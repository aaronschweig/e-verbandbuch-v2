<template>
  <div class="sm:flex sm:overflow-x-hidden">
    <div
      class="min-h-screen sm:min-h-0 sm:min-w-full transition-transform duration-200 ease-in-out"
    >
      <h2 id="h2_1">Angaben zum Unfallhergang</h2>
      <h3>Wer wurde wo verletzt?</h3>
      <ev-input label="Name des Verletzten" placeholder="Thomas Müller">
        <template #icon>
          <svg
            class="h-6 text-gray-600"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
        </template>
      </ev-input>
      <ev-input label="Unfallort" placeholder="Mannheim">
        <template #icon>
          <svg
            class="h-6 text-gray-600"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            ></path>
          </svg>
        </template>
      </ev-input>
      <ev-input label="Arbeitsbereich" placeholder="Garage A">
        <template #icon>
          <svg
            class="h-6 text-gray-600"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
            ></path>
          </svg>
        </template>
      </ev-input>

      <h3>Wer wurde wo verletzt?</h3>

      <ev-input label="Name der Zeugen" placeholder="Monika Musterfrau">
        <template #icon>
          <svg
            class="h-6 text-gray-600"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
        </template>
      </ev-input>
    </div>
    <div
      class="min-h-screen sm:min-h-0 sm:min-w-full transition-transform duration-200 ease-in-out"
    >
      <h2 id="h2_2">Angaben zum Unfallhergang</h2>
      <h3>Wie ist der Unfall abgelaufen?</h3>
      <h3>Was ist der Umfang der Verletzung?</h3>
    </div>
    <div
      class="min-h-screen sm:min-h-0 sm:min-w-full transition-transform duration-200 ease-in-out"
    >
      <h2 id="h2_3">Angaben zur Erste-Hilfe Leistung</h2>
      <h3>Wer hat wann geholfen?</h3>
      <ev-input label="Name des Ersthelfers" placeholder="Thomas Müller">
        <template #icon>
          <svg
            class="h-6 text-gray-600"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
        </template>
      </ev-input>
      <ev-input label="Datum und Uhrzeit der Hilfe" placeholder="13:15 Uhr">
        <template #icon>
          <svg
            class="h-6 text-gray-600"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
        </template>
      </ev-input>
      <h3>Welche Erste-Hilfe-Massnahmen wurden ergriffen?</h3>
    </div>

    <div class="fixed w-full z-10" style="bottom: 1.5rem;">
      <div class="flex justify-center items-center space-x-16">
        <ev-button @click="send('PREV')">zurück</ev-button>
        <ev-button @click="send('NEXT')">Weiter</ev-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { createStepperMachine, stepperMachine } from "@/machine/stepper";

export default Vue.extend({
  data: () => ({
    stepperServie: createStepperMachine(),
    current: stepperMachine.initialState,
    context: stepperMachine.context!
  }),
  created() {
    this.stepperServie
      .onTransition(state => {
        this.current = state;
        this.context = state.context;
        const heading = document.getElementById("h2_" + state.context.step);
        if (heading) {
          const y = heading.getBoundingClientRect().top + window.pageYOffset;

          window.scrollTo({ top: y - 128, behavior: "smooth" });
        }
      })
      .start();
  },
  methods: {
    send(event: "NEXT" | "PREV" | "JUMP", to?: number) {
      this.stepperServie.send(event, { step: to });
    }
  }
});
</script>
