<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <h1
      class="h3 mb-2"
      :class="stock.total > 0 ? 'text-success' : 'text-danger'"
    >
      {{ stock._id }}
    </h1>
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <div class="row">
          <div class="col-6">
            <h6
              class="m-0 font-weight-bold"
              :class="stock.total > 0 ? 'text-success' : 'text-danger'"
            >
              {{ stock.total }}
            </h6>
          </div>
          <div class="col-6">
            <div
              class="form-check form-check-inline"
              v-for="time in timeFrames"
              :key="time.cssid"
            >
              <input
                class="form-check-input"
                type="radio"
                @change="callme"
                v-model="inlineRadioOptions"
                name="inlineRadioOptions"
                :id="time.cssid"
                :value="time.params"
              />
              <label class="form-check-label" :for="time.cssid">{{
                time.text
              }}</label>
              <div class="divider"></div>
            </div>
          </div>
        </div>
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
                <th colspan="3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="transaction in stock.transactions"
                :key="transaction._id"
                :class="
                  transaction.action == 'Buy' ? 'text-danger' : 'text-success'
                "
              >
                <td>{{ transaction.description }}</td>
                <td>{{ date(transaction.date) }}</td>
                <td>{{ transaction.action }}</td>
                <td>{{ transaction.quantity }}</td>
                <td>{{ transaction.price }}</td>
                <td>${{ transaction.amount }}</td>
                <td>
                  <a
                    @click="toggleRealized(transaction)"
                    :class="
                      transaction.type === 'realized'
                        ? 'text-primary'
                        : 'text-success'
                    "
                    ><i
                      class="fas fa-sm text-success-50"
                      :class="
                        transaction.type === 'realized'
                          ? 'fa-money-check'
                          : 'fa-money-check-alt'
                      "
                    ></i
                  ></a>
                </td>
                <td>
                  <a href="#" class="text-info"
                    ><i class="fas fa-edit fa-sm text-primary-50"></i
                  ></a>
                </td>
                <td>
                  <a href="#" class="text-danger"
                    ><i class="fas fa-trash fa-sm text-danger-50"></i
                  ></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Logout Modal-->
    <div
      class="modal fade show"
      id="uploadModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Form</h5>
            <button
              class="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
              @click="toggleUploadModal"
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
                  ref="file"
                  @change="handleFileUpload"
                  class="form-control bg-light border-0 small"
                  placeholder="Search for..."
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
              @click="toggleUploadModal"
            >
              Cancel
            </button>
            <button class="btn btn-success" @click="submitFile">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  cursor: pointer;
}
</style>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import moment from "moment";
import filters from "@/components/cards/filters.js";

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
    const timeFrames = filters.timeFrames;
    const inlineRadioOptions = ref(store.state.timeFilter);

    store.dispatch("getStock", route.params.id);

    const stock = computed(() => store.state.stock);

    return {
      timeFrames,
      stock,
      inlineRadioOptions,

      callme() {
        store.state.timeFilter = this.inlineRadioOptions;
        store.dispatch("getStock", route.params.id);
      },

      async toggleRealized(transaction) {
        await store.dispatch("toggleRealized", transaction);
      },
    };
  },
};
</script>

<style scoped>
.block {
  display: block;
}

.divider {
  margin: auto 1rem;
}
</style>

