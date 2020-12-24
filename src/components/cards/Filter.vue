<template>
  <section>
    <!-- Section: Filters -->
    <section class="filters">
      <h5>Filters</h5>
      <!-- Section: Condition -->
      <section filter="condition" class="mb-4">
        <h6 class="font-weight-bold mb-3">Condition</h6>

        <div class="form-check pl-0 mb-3">
          <input
            type="checkbox"
            class="filter-option form-check-input filled-in"
            @click="open('Open')"
            condition="new"
            id="new"
          />
          <label
            class="form-check-label small text-uppercase card-link-secondary"
            for="new"
            >Open</label
          >
        </div>
        <div class="form-check pl-0 mb-3">
          <input
            type="checkbox"
            class="filter-option form-check-input filled-in"
            @click="open('Open')"
            condition="closed"
            id="closed"
          />
          <label
            class="form-check-label small text-uppercase card-link-secondary"
            for="closed"
            >closed</label
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
  </section>
</template>

<script>
import { useStore } from "vuex";
import filters from "./filters";

export default {
  name: "Filter",
  setup() {
    const store = useStore();

    const status = filters.status;
    const timeFrames = filters.timeFrames;

    return {
      timeFrames,
      status,

      getStatus(status) {
        store.state.status = status;
        store.dispatch("paginate");
      },

      open() {
        store.dispatch("getOpenPositions");
      },

      recent(frame) {
        store.dispatch("getAllStocks", frame);
      },
    };
  },
};
</script>

<style>
</style>