<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="row">
      <div class="col-md-2">
        <Filter />
      </div>
      <div class="col-md-10">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h4 mb-0 text-gray-800">
            Tickers ({{ totalStocksCount }})
          </h1>

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
              <a class="dropdown-item" @click="togglePrivate">
                <i
                  class="fas fa-balance-scale fa-sm fa-fw mr-2 text-gray-400"
                ></i>
                All
              </a>

              <div class="dropdown-divider"></div>
              <a
                class="dropdown-item"
                data-toggle="modal"
                data-target="#uploadModal"
              >
                <i class="fas fa-calendar fa-sm fa-fw mr-2 text-gray-400"></i>
                Last 1 Day
              </a>
            </div>
          </span>
        </div>
        <div class="row">
          <div
            class="col-xl-2 col-md-3 mb-4"
            v-for="stock in stocks"
            :key="stock._id"
          >
            <div
              class="card shadow h-100 py-2"
              :class="
                stock.total >= 0 ? 'border-left-success' : 'border-left-danger'
              "
            >
              <router-link :to="{ name: 'StockDetails', params: { id: stock._id } }">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div
                        class="text-xs font-weight-bold text-uppercase mb-1"
                        :class="
                          stock.total >= 0 ? 'text-success' : 'text-danger'
                        "
                      >
                        ${{ stock.total }}
                      </div>
                      <div
                        class="h7 mb-0 font-weight-bold"
                        :class="
                          stock.total >= 0 ? 'text-success' : 'text-danger'
                        "
                      >
                        {{ stock._id }}
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <v-pagination
          v-if="pages > 1"
          class="pagination"
          v-model="page"
          :pages="pages"
          :range-size="1"
          active-color="#DCEDFF"
          @update:modelValue="paginate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import VPagination from "vue3-pagination";
import Filter from "@/components/cards/Filter.vue";

import "vue3-pagination/dist/vue3-pagination.css";

export default {
  name: "Stock",
  components: {
    VPagination,
    Filter,
  },
  setup() {
    const store = useStore();
    const page = ref(store.state.stocks.paginationCurrentPage);

    store.dispatch("stocks/filter", page.value);

    return {
      page,
      filterDropdown: ref(false),
      filter: ref("Filter"),
      stocks: computed(() => store.state.stocks.stocks),
      totalStocksCount: computed(() => store.state.stocks.count),
      pages: computed(() => Math.ceil(store.state.stocks.count / 30)),

      paginate() {
        store.state.stocks.paginationCurrentPage = page.value;
        store.dispatch("stocks/filter");
      },

      togglePrivate() {
        store.dispatch("stocks/togglePrivate")
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
