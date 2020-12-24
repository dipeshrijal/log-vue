<template>
  <section>
    <!-- Section: Filters -->
    <section class="filters">
      <h5>Filters</h5>
      <!-- Section: Condition -->
      <section filter="condition" class="mb-4">
        <h6 class="font-weight-bold mb-3">Condition</h6>

        <!-- <div
          v-for="condition in conditions"
          :key="condition.cssid"
          class="form-check pl-0 mb-3"
        >
          <input
            type="radio"
            @click="postionStatus(condition.params)"
            class="filter-option form-check-input"
            :id="condition.cssid"
            name="condtionfilter"
          />
          <label
            class="form-check-label small text-uppercase card-link-secondary"
            :for="condition.cssid"
            >{{ condition.text }}</label
          >
        </div> -->
        <div
          class="form-check pl-0 mb-3"
          v-for="condition in conditions"
          :key="condition.cssid"
        >
          <input
            type="checkbox"
            :value="condition.params"
            v-model="checked"
            class="filter-option form-check-input filled-in"
            @change="postionStatus()"
            :id="condition.cssid"
          />
          <label
            class="form-check-label small text-uppercase card-link-secondary"
            :for="condition.cssid"
            >{{ condition.text }}</label
          >
        </div>
      </section>
      <!-- Section: Condition -->

      <!-- Section: Status -->
      <section class="mb-4">
        <h6 class="font-weight-bold mb-3">Status</h6>

        <div v-for="s in status" :key="s.cssid" class="form-check pl-0 mb-3">
          <input
            type="radio"
            @click="getStatus(s.params)"
            class="filter-option form-check-input"
            :id="s.cssid"
            name="materialExampleRadios"
          />
          <label
            class="form-check-label small text-uppercase card-link-secondary"
            :for="s.cssid"
            >{{ s.text }}</label
          >
        </div>
      </section>
      <!-- Section: Status -->
      <!-- Section: Timeframes -->
      <section class="mb-4" filter="price">
        <h6 class="font-weight-bold mb-3">Time Frame</h6>

        <div
          v-for="timeFrame in timeFrames"
          :key="timeFrame.cssid"
          class="form-check pl-0 mb-3"
        >
          <input
            type="radio"
            @click="recent(timeFrame.params)"
            class="filter-option form-check-input"
            :id="timeFrame.cssid"
            name="materialExampleRadios1"
          />
          <label
            class="form-check-label small text-uppercase card-link-secondary"
            :for="timeFrame.cssid"
            >{{ timeFrame.text }}</label
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
    const timeFrames = filters.timeFrames;
    const conditions = filters.conditions;
    const checked = ref(false);
    const isLoading = ref(computed(() => store.state.isLoading));
    const fullPage = ref(true);
    return {
      timeFrames,
      status,
      conditions,
      checked,
      isLoading,
      fullPage,

      getStatus(status) {
        store.state.status = status;
        store.dispatch("filteredStocks");
      },

      async postionStatus() {
        store.state.postionStatus = this.checked;
        await store.dispatch("filteredStocks");
      },

      recent(frame) {
        store.state.timeFilter = frame;
        store.dispatch("filteredStocks");
      },
    };
  },
};
</script>

<style scoped>
</style>