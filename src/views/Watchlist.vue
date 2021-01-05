<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-10">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h4 mb-0 text-gray-800">
            Watchlist
            <!-- Tickers ({{ totalStocksCount }}) -->
          </h1>
          <a
            class="d-none d-sm-inline-block float-end btn btn-lg btn-success shadow-sm"
            id="filterDropdown"
            @click="toggleWatchlistModal"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            ><i class="fas fa-plus fa-sm text-white-50"></i>
          </a>

          <div
            class="modal fade"
            :class="watchlistModal ? 'show block' : ''"
            id="watchlistModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Create Watchlist
                  </h5>
                  <button
                    class="close"
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                    @click="toggleWatchlistModal"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form
                    class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
                  >
                    <div class="input-group">
                      <input
                        type="text"
                        v-model="watchlistForm.ticker"
                        class="form-control bg-light border-0 small"
                        placeholder="Enter Name..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                      />
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    class="btn btn-danger"
                    type="button"
                    data-dismiss="modal"
                    @click="toggleWatchlistModal"
                  >
                    Cancel
                  </button>
                  <button class="btn btn-success" @click="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="col-xl-2 col-md-3 mb-4"
            v-for="w in watchlist"
            :key="w._id"
          >
            <div class="card shadow h-100 py-2">
              <router-link
                :to="{ name: 'StockDetails', params: { id: w.ticker } }"
              >
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div
                        class="text-xs font-weight-bold text-uppercase mb-1"
                      ></div>
                      <div class="h7 mb-0 font-weight-bold">
                        {{ w.ticker }}
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
import { computed, reactive, ref } from "vue";
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
    const watchlistForm = reactive({
      ticker: "",
    });
    // const page = ref(store.state.stocks.paginationCurrentPage);

    // store.dispatch("watchlist/index", page.value);
    store.dispatch("watchlist/index");

    return {
      // page,
      watchlistForm,
      watchlist: computed(() => store.state.watchlist.watchlist),
      watchlistModal: ref(false),

      toggleWatchlistModal() {
        this.watchlistModal = !this.watchlistModal;
        this.watchlistForm.ticker = "";
      },

      submit() {
        // console.log(this.watchlistForm);
        store.dispatch("watchlist/create", this.watchlistForm);
        this.watchlistForm.ticker = "";
        this.watchlistModal = false;
      },
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
.block {
  display: block;
}
</style>
