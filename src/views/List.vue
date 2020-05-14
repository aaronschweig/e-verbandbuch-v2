<template>
  <div>
    <ev-card
      v-for="eintrag in eintraege"
      :key="eintrag.id"
      class="md:hidden"
      v-bind="eintrag"
    />
    <div class="hidden md:block md:pb-12">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-semibold text-gray-900">
          Übersicht der Einträge
        </h2>
        <router-link
          to="/create"
          tag="ev-button"
          class="flex space-x-2 normal-case"
        >
          <span>
            Eintrag erstellen
          </span>
          <svg class="h-6 fill-current" viewBox="0 0 24 24" fill="none">
            <path
              d="M23.603 12H5.091m9.256-8v16V4z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </router-link>
      </div>
      <div class="bg-white rounded-lg shadow-lg pt-4 mt-6 border">
        <table class="table-fixed w-full">
          <thead>
            <tr class="text-left border-b border-gray-600">
              <ev-th
                class="pl-6"
                sort-key="unfallzeitpunkt"
                :state="currentSortedBy"
                @click="send('SORT', 'unfallzeitpunkt')"
              >
                Unfalldatum
              </ev-th>
              <ev-th
                sort-key="verletzter"
                :state="currentSortedBy"
                @click="send('SORT', 'verletzter')"
              >
                Name des Verletzten
              </ev-th>
              <ev-th
                sort-key="hergang"
                :state="currentSortedBy"
                @click="send('SORT', 'hergang')"
              >
                Hergang
              </ev-th>
              <ev-th
                sort-key="umfang"
                :state="currentSortedBy"
                @click="send('SORT', 'umfang')"
                class="w-1/3 pr-6"
              >
                Art und Umfang
              </ev-th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(eintrag, i) in eintraege"
              :key="eintrag.id"
              class="align-text-top border-b text-gray-800 hover:bg-gray-100 active:bg-gray-100"
              :class="{ 'bg-gray-100': i % 2 === 0 }"
              @click="toggleExpansion(i)"
            >
              <td class="py-3 pl-6">{{ eintrag.unfallzeitpunkt | format }}</td>
              <td class="py-3">{{ eintrag.verletzter || "-" }}</td>
              <td :class="{ truncate: !isExpanded[i] }" class="py-3">
                {{ eintrag.hergang || "-" }}
              </td>
              <td :class="{ truncate: !isExpanded[i] }" class="py-3 pl-1 pr-6">
                {{ eintrag.umfang || "-" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { useDateFormatter } from "@/use/useDateFormatter";
import { useQuery } from "@/use/useQuery";
import { interpret, Interpreter, assign } from "xstate";
import {
  sortMachine,
  descendingSorter,
  ascendigSorter
} from "../machine/sorter";
import { Verbandbuch } from "@/types";

export default Vue.extend({
  data: () => ({
    isExpanded: [] as boolean[],
    eintraege: [] as Verbandbuch[],
    currentSortedBy: {
      key: sortMachine.context!.key,
      order: sortMachine.initialState
    },
    sortService: {} as Interpreter<any>
  }),
  async created() {
    this.sortService = interpret(
      sortMachine.withConfig({
        actions: {
          ascSort: assign((ctx, event) => {
            const key = event.key as keyof Verbandbuch;
            this.eintraege = this.eintraege.sort(ascendigSorter(key));
            return { key };
          }),
          descSort: assign((ctx, event) => {
            const key = event.key as keyof Verbandbuch;
            this.eintraege = this.eintraege.sort(descendingSorter(key));
            return { key };
          }),
          cleanSort: assign((ctx, event) => {
            this.eintraege = this.eintraege.sort((e1, e2) => e1.id - e2.id);
            return { key: "" };
          })
        }
      })
    )
      .onTransition(state => {
        this.currentSortedBy.key = state.context.key;
        this.currentSortedBy.order = state;
      })
      .start();
    const { findVerbandbuch: result } = await useQuery<{
      findVerbandbuch: Verbandbuch[];
    }>(`
    query findVerbandbuch {
        findVerbandbuch {
            id
            verletzter
            unfallzeitpunkt
            hergang
            umfang
        }
    }`);
    this.isExpanded = new Array(result.length).fill(false);
    this.eintraege = result.map(r => ({ ...r, name: r.verletzter }));
  },
  methods: {
    toggleExpansion(idx: number) {
      // Mähh
      this.isExpanded[idx] = !this.isExpanded[idx];
      this.isExpanded = [...this.isExpanded];
    },
    send(event: "SORT", key: keyof Verbandbuch) {
      this.sortService.send("SORT", { key });
    }
  },
  filters: {
    format(val: string | Date) {
      if (val === null) {
        return " - ";
      }
      val = new Date(val);
      return useDateFormatter().format(val);
    }
  }
});
</script>
