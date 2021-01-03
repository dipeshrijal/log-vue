<template>
  <section>
    <!-- Section: Filters -->
    <section class="filters">
      <h5>Filters:</h5>
      <!-- Section: Condition -->
      <section filter="condition" class="mb-4">
        <h6 class="font-weight-bold mb-3">Condition:</h6>
        <div
          class="form-check pl-0 mb-3"
          v-for="g in gains"
          :key="g.id"
        >
          <input
            type="checkbox"
            :value="g.params"
            v-model="showUnrealized"
            class="filter-option form-check-input filled-in"
            @change="toggleRealized"
            :id="g.id"
          />
          <label
            class="form-check-label small text-uppercase card-link-secondary"
            :for="g.id"
            ><i
              :class="`fas ${g.icon} fa-sm fa-fw mr-2 text-gray-400`"
            ></i
            >{{ g.text }}</label
          >
        </div>
      </section>
      <!-- Section: Condition -->

      <!-- Section: Status -->
      <section class="mb-4">
        <h6 class="font-weight-bold mb-3">Status:</h6>

        <div v-for="s in status" :key="s.id" class="form-check pl-0 mb-3">
          <input
            type="radio"
            @change="getStatus()"
            class="filter-option form-check-input"
            :id="s.id"
            :value="s.params"
            v-model="statusRadio"
            name="materialExampleRadios"
          />
          <label
            class="form-check-label small text-uppercase card-link-secondary"
            :for="s.id"
            ><i :class="`fas ${s.icon} fa-sm fa-fw mr-2 text-gray-400`"></i
            >{{ s.text }} ({{ calculate(s.text) }})</label
          >
        </div>
      </section>
      <!-- Section: Status -->
      <!-- Section: Timeframes -->
      <section class="mb-4" filter="price">
        <h6 class="font-weight-bold mb-3">Range:</h6>

        <div
          v-for="r in range"
          :key="r.id"
          class="form-check pl-0 mb-3"
        >
          <input
            type="radio"
            @change="recent"
            class="filter-option form-check-input"
            :id="r.id"
            v-model="rangeRadio"
            :value="r.params"
            name="materialExampleRadios1"
          />
          <label
            class="form-check-label small text-uppercase card-link-secondary"
            :for="r.id"
            ><i
              :class="`fas ${r.icon} fa-sm fa-fw mr-2 text-gray-400`"
            ></i
            >{{ r.text }}</label
          >
        </div>
      </section>
      <!-- Section: Timeframes -->
    </section>
    <!-- Section: Filters -->
    <loading :active="isLoading" :is-full-page="fullPage"></loading>
  </section>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import filters from "./filters";
import Loading from "vue3-loading-overlay";
// Import stylesheet
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";

export default {
  name: "Filter",
  components: {
    Loading,
  },
  setup() {
    const store = useStore();

    const status = filters.status;
    const range = filters.range;
    const gains = filters.gains;

    const showUnrealized = ref(store.state.stocks.showUnrealized);
    const rangeRadio = ref(store.state.stocks.range);
    const statusRadio = ref(store.state.stocks.status);

    const isLoading = ref(computed(() => store.state.stocks.isLoading));
    const fullPage = ref(true);

    return {
      range,
      status,
      gains,

      showUnrealized,
      statusRadio,
      rangeRadio,

      isLoading,
      fullPage,

      calculate(text) {
        let total = 0;
        
        if(!store.state.stocks.isPrivate) {
          switch (text) {
            case "All":
              total = store.getters['stocks/total'];
              break;
            case "Profit":
              total = store.getters['stocks/profit'];
              break;
            case "Loss":
              total = store.getters['stocks/loss'];
              break;
          }
        }

        return total;
      },

      async toggleRealized() {
        store.state.stocks.showUnrealized = this.showUnrealized;
        await store.dispatch("stocks/filter");
      },

      async getStatus() {
        store.state.stocks.status = this.statusRadio;
        await store.dispatch("stocks/filter");
      },

      async recent() {
        store.state.stocks.range = this.rangeRadio;
        await store.dispatch("stocks/filter");
      },
    };
  },
};
</script>

<style scoped></style>
