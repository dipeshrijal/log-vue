<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h4 mb-0 text-gray-800">Tickers ({{ stocks.length }})</h1>

      <!-- Nav Item - User Information -->
      <span class="dropdown">
        <a
          @click="toggleFilterDropdown"
          class="d-none d-sm-inline-block float-end btn btn-sm btn-info shadow-sm"
          id="filterDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          ><i class="fas fa-filter fa-sm text-white-50"></i> {{ filter }}
        </a>
        <!-- Dropdown - User Information -->
        <div
          class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
          :class="filterDropdown ? 'show' : ''"
          aria-labelledby="filterDropdown"
        >
          <a class="dropdown-item" @click="all('All')">
            <i class="fas fa-balance-scale fa-sm fa-fw mr-2 text-gray-400"></i>
            All
          </a>
          <a class="dropdown-item" @click="profit('Profit')">
            <i class="fas fa-level-up-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Profit
          </a>

          <a class="dropdown-item" @click="loss('Loss')">
            <i class="fas fa-level-down-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Loss
          </a>

          <a class="dropdown-item" @click="open('Open')">
            <i class="fas fa-money-check fa-sm fa-fw mr-2 text-gray-400"></i>
            Open
          </a>

          <div class="dropdown-divider"></div>
          <a
            class="dropdown-item"
            @click="recent(1, 'Last 1 Day')"
            data-toggle="modal"
            data-target="#uploadModal"
          >
            <i class="fas fa-calendar fa-sm fa-fw mr-2 text-gray-400"></i>
            Last 1 Day
          </a>
          <a
            class="dropdown-item"
            @click="recent(3, 'Last 3 Days')"
            data-toggle="modal"
            data-target="#uploadModal"
          >
            <i class="fas fa-calendar fa-sm fa-fw mr-2 text-gray-400"></i>
            Last 3 Days
          </a>
          <a
            class="dropdown-item"
            @click="recent(7, 'Last 7 Days')"
            data-toggle="modal"
            data-target="#uploadModal"
          >
            <i class="fas fa-calendar fa-sm fa-fw mr-2 text-gray-400"></i>
            Last 15 Days
          </a>
          <a
            class="dropdown-item"
            @click="recent(7, 'Last 15 Days')"
            data-toggle="modal"
            data-target="#uploadModal"
          >
            <i class="fas fa-calendar fa-sm fa-fw mr-2 text-gray-400"></i>
            Last 15 Days
          </a>
          <a
            class="dropdown-item"
            @click="recent(30, 'Last 30 Days')"
            data-toggle="modal"
            data-target="#uploadModal"
          >
            <i class="fas fa-calendar fa-sm fa-fw mr-2 text-gray-400"></i>
            Last 30 Days
          </a>
        </div>
      </span>
    </div>
    <div class="row">
      <div
        class="col-xl-2 col-md-6 mb-4"
        v-for="stock in stocks"
        :key="stock._id"
      >
        <div
          class="card shadow h-100 py-2"
          :class="
            stock.total >= 0 ? 'border-left-success' : 'border-left-danger'
          "
        >
          <!-- <router-link :to="{ name: 'Tables', params: { id: 'fb' } }"> -->
          <router-link :to="{ name: 'Tables', params: { id: stock._id } }">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="text-xs font-weight-bold text-uppercase mb-1"
                    :class="stock.total >= 0 ? 'text-success' : 'text-danger'"
                  >
                    ${{ stock.total }}
                  </div>
                  <div
                    class="h7 mb-0 font-weight-bold"
                    :class="stock.total >= 0 ? 'text-success' : 'text-danger'"
                  >
                    {{ stock._id }}
                  </div>
                </div>
                <!-- <div class="col-auto">
                  <i
                    class="fas fa-dollar-sign fa-2x"
                    :class="stock.total > 0 ? 'text-success' : 'text-danger'"
                  ></i>
                </div> -->
              </div>
            </div>
          </router-link>
          <!-- </router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Cards",
  setup() {
    const store = useStore();

    store.dispatch("getAllStocks");

    return {
      filterDropdown: ref(false),
      filter: ref("Filter"),
      stocks: computed(() => store.state.stocks),

      loss(filter) {
        this.filter = filter;
        this.filterDropdown = false;
        store.dispatch("getLoss");
      },

      profit(filter) {
        this.filter = filter;
        store.dispatch("getProfit");
        this.filterDropdown = false;
      },

      all(filter) {
        this.filter = filter;
        store.dispatch("getAllStocks");
        this.filterDropdown = false;
      },

      open(filter) {
        this.filter = filter;
        store.dispatch("getOpenPositions");
        this.filterDropdown = false;
      },

      recent(frame, filter) {
        this.filter = filter;
        store.dispatch("getAllStocks", frame);
        this.filterDropdown = false;
      },

      toggleFilterDropdown() {
        this.filterDropdown = !this.filterDropdown;
      },
    };
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  cursor: pointer;
}
</style>