<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="row">
      <div class="col-md-2">
      </div>
      <div class="col-md-10">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h4 mb-0 text-gray-800">
            <!-- Tickers ({{ totalStocksCount }}) -->
          </h1>
        </div>
        <div class="row">
          <div
            class="col-xl-2 col-md-3 mb-4"
            v-for="w in watchlist"
            :key="w._id"
          >
            <div class="card shadow h-100 py-2"
            >
              <router-link :to="{ name: 'StockDetails', params: { id: w.ticker } }">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div
                        class="text-xs font-weight-bold text-uppercase mb-1"
                      >
                      
                      </div>
                      <div
                        class="h7 mb-0 font-weight-bold"
                      >
                      {{w.ticker}}
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <!-- <v-pagination
          v-if="pages > 1"
          class="pagination"
          v-model="page"
          :pages="pages"
          :range-size="1"
          active-color="#DCEDFF"
          @update:modelValue="paginate"
        /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
// import VPagination from "vue3-pagination";

import "vue3-pagination/dist/vue3-pagination.css";

export default {
  name: "Watchlist",
  // components: {
  //   VPagination,
  // },
  setup() {
    const store = useStore();
    // const page = ref(store.state.stocks.paginationCurrentPage);

    // store.dispatch("watchlist/index", page.value);
    store.dispatch("watchlist/index");

    return {
      // page,
      watchlist: computed(() => store.state.watchlist.watchlist),
      // totalStocksCount: computed(() => store.state.stocks.count),
      // pages: computed(() => Math.ceil(store.state.stocks.count / 30)),

      // paginate() {
      //   store.state.stocks.paginationCurrentPage = page.value;
      //   store.dispatch("stocks/filter");
      // }
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
