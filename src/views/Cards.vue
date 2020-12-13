<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h4 mb-0 text-gray-800">Tickers ({{ stocks.length }})</h1>
      <a
        @click="all"
        class="d-none d-sm-inline-block float-end btn btn-sm btn-primary shadow-sm"
        ><i class="fas fa-balance-scale fa-sm text-white-50"></i> All ({{
          total
        }})
      </a>

      <a
        @click="profit"
        class="d-none d-sm-inline-block float-end btn btn-sm btn-success shadow-sm"
        ><i class="fas fa-level-up-alt fa-sm text-white-50"></i> Profit ({{
          totalProfit
        }})
      </a>

      <a
        @click="loss"
        class="d-none d-sm-inline-block float-end btn btn-sm btn-danger shadow-sm"
        ><i class="fas fa-level-down-alt fa-sm text-white-50"></i> Loss ({{
          totalLoss
        }})
      </a>
    </div>

    <div class="row">
      <div
        class="col-xl-3 col-md-6 mb-4"
        v-for="stock in stocks"
        :key="stock.ticker"
      >
        <div
          class="card shadow h-100 py-2"
          :class="
            stock.status == 'profit'
              ? 'border-left-success'
              : 'border-left-danger'
          "
        >
          <!-- <router-link :to="{ name: 'Tables', params: { id: 'fb' } }"> -->
          <router-link :to="{ name: 'Tables', params: { id: stock.ticker } }">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="text-xs font-weight-bold text-uppercase mb-1"
                    :class="
                      stock.status == 'profit' ? 'text-success' : 'text-danger'
                    "
                  >
                    ${{ stock.total }}
                  </div>
                  <div
                    class="h5 mb-0 font-weight-bold"
                    :class="
                      stock.status == 'profit' ? 'text-success' : 'text-danger'
                    "
                  >
                    {{ stock.ticker }}
                  </div>
                </div>
                <div class="col-auto">
                  <i
                    class="fas fa-dollar-sign fa-2x"
                    :class="
                      stock.status == 'profit' ? 'text-success' : 'text-danger'
                    "
                  ></i>
                </div>
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
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Cards",
  setup() {
    const store = useStore();
    store.dispatch("getAllStocks");
    return {
      stocks: computed(() => store.state.stocks),
      total: computed(() => store.state.total),
      totalProfit: computed(() => store.state.totalProfit),
      totalLoss: computed(() => store.state.totalLoss),
      totalTransaction: computed(() => store.state.totalTransaction),
      loss: () => {
        store.dispatch("getLoss");
      },
      profit: () => {
        store.dispatch("getProfit");
      },
      all: () => {
        store.dispatch("getAllStocks");
      },
    };
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>