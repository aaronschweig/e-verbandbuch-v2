<template>
  <div class="sm:flex sm:flex-col sm:items-center">
    <div class="min-h-screen sm:w-2/3">
      <h2 id="h2_1" class="text-xl font-bold">
        Angaben zum Unfallhergang (1/2)
      </h2>
      <h3 class="text-lg font-medium mt-8">Wer wurde wo verletzt?</h3>
      <div class="space-y-6">
        <ev-input
          label="Name des Verletzten"
          placeholder="Thomas Müller"
          v-model="verbandbuch.verletzter"
        >
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
        <ev-input
          label="Unfallort"
          placeholder="Mannheim"
          v-model="verbandbuch.unfallort"
        >
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
        <ev-input
          label="Arbeitsbereich"
          placeholder="Garage A"
          v-model="verbandbuch.arbeitsbereich"
        >
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
      </div>

      <h3 class="text-lg font-medium mt-8">Wer wurde wo verletzt?</h3>

      <ev-input
        label="Name der Zeugen"
        placeholder="Monika Musterfrau"
        v-model="verbandbuch.zeugen"
      >
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
    <div class="min-h-screen sm:w-2/3">
      <h2 id="h2_2" class="text-xl font-bold">
        Angaben zum Unfallhergang (2/2)
      </h2>
      <h3 class="text-lg font-medium mt-8">Wie ist der Unfall abgelaufen?</h3>
      <ev-textarea
        placeholder="Hammerschlag auf die Hand ..."
        v-model="verbandbuch.hergang"
      />
      <h3 class="text-lg font-medium mt-8">
        Was ist der Umfang der Verletzung?
      </h3>
      <ev-textarea
        placeholder="Gebrochener Zeigefinger und blutende Hand ..."
        v-model="verbandbuch.umfang"
      />
    </div>
    <div class="min-h-screen sm:w-2/3">
      <h2 id="h2_3" class="text-xl font-bold">
        Angaben zur Erste-Hilfe Leistung (1/1)
      </h2>
      <h3 class="text-lg font-medium mt-8">Wer hat wann geholfen?</h3>
      <div class="space-y-6">
        <ev-input
          label="Name des Ersthelfers"
          placeholder="Thomas Müller"
          v-model="verbandbuch.ersthelfer"
        >
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
        <ev-input
          label="Datum und Uhrzeit der Hilfe"
          placeholder="13:15 Uhr"
          v-model="verbandbuch.erstehilfezeitpunkt"
        >
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
      </div>
      <h3 class="text-lg font-medium mt-8">
        Welche Erste-Hilfe-Massnahmen wurden ergriffen?
      </h3>
      <ev-textarea
        placeholder="Verband angelegt und Hand stabilisiert ..."
        v-model="verbandbuch.massnahmen"
      />
    </div>

    <div class="fixed w-full z-10" style="bottom: 1.5rem;">
      <div class="flex justify-center items-center space-x-16">
        <ev-button @click="send('PREV')">zurück</ev-button>
        <ev-button @click="send('NEXT')">{{
          current.matches("last") ? "Absenden" : "Weiter"
        }}</ev-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { createStepperMachine, stepperMachine } from "@/machine/stepper";
import { Interpreter } from "xstate";
import { useMutation } from "../use/useQuery";

export default Vue.extend({
  data: () => ({
    stepperService: {} as Interpreter<
      {
        step: number;
        MAX_STEP_COUNT: number;
      },
      any
    >,
    current: stepperMachine.initialState,
    context: stepperMachine.context!,
    observer: (null as unknown) as IntersectionObserver,
    verbandbuch: {
      verletzter: "",
      unfallzeitpunkt: new Date().toISOString(),
      arbeitsbereich: "",
      unfallort: "",
      hergang: "",
      umfang: "",
      zeugen: "",
      erstehilfezeitpunkt: new Date().toISOString(),
      massnahmen: "",
      ersthelfer: ""
    }
  }),
  created() {
    this.stepperService = createStepperMachine(this.submit);
    this.stepperService
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
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const step = parseInt(e.target.id.split("_")[1], 10);
          if (this.context.step !== step) {
            this.send("JUMP", step);
          }
        }
      });
    });
    const headings = document.getElementsByClassName("text-xl font-bold");
    for (const heading of headings) {
      this.observer.observe(heading);
    }
  },
  methods: {
    send(event: "NEXT" | "PREV" | "JUMP", to?: number) {
      this.stepperService.send(event, { step: to });
    },
    async submit() {
      const res = await useMutation(
        `mutation createEintrag { updateVerbandbuch(verbandbuch: {${Object.keys(
          {
            ...this.verbandbuch
            //erstehilfezeitpunkt: this.ehDate,
          }
        )
          .map(key => {
            return (
              key +
              ': "' +
              ((this.verbandbuch as any)[key] as string).replace(/"/gm, '"') +
              '",'
            );
          })
          .join("")}}) {
            id
          }
          }`,
        this.verbandbuch
      );
      console.log(res);
      console.log("SUBMIT");
    }
  }
});
</script>
