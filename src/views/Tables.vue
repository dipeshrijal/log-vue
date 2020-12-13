<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <h1
      class="h3 mb-2"
      :class="stock.total > 0 ? 'text-success' : 'text-danger'"
    >
      {{ stock.ticker }}
    </h1>

    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6
          class="m-0 font-weight-bold"
          :class="stock.total > 0 ? 'text-success' : 'text-danger'"
        >
          {{ stock.total }}
        </h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>Description</th>
                <th>Date</th>
                <th>Action</th>
                <th>Quantity</th>
                <th>Cost/Share</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="transaction in stock.transactions"
                :key="transaction"
                :class="
                  transaction.action == 'Buy' ? 'text-success' : 'text-danger'
                "
              >
                <td>{{ transaction.description }}</td>
                <td>{{ date(transaction.date) }}</td>
                <td>{{ transaction.action }}</td>
                <td>{{ transaction.quantity }}</td>
                <td>{{ transaction.price }}</td>
                <td>${{ transaction.amount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import moment from "moment";
export default {
  name: "Tables",
  methods: {
    date: (date) => {
      return moment(date).format("YYYY/MM/DD");
    },
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    store.dispatch("getStock", route.params.id);
    return {
      stock: computed(() => store.state.stock),
    };
  },
};
</script>

