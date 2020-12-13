<template>
  <div class="hello">
    <!-- Sidebar -->
    <ul
      class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      :class="toggle == true ? 'toggled' : ''"
      id="accordionSidebar"
    >
      <!-- Sidebar - Brand -->
      <a
        class="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0" />

      <!-- Nav Item - Dashboard -->
      <li class="nav-item">
        <router-link class="nav-link" to="/">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </router-link>
      </li>

      <!-- Nav Item - Cards -->
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'Cards' }">
          <i class="fas fa-fw fa-money-check"></i>
          <span>Cards</span>
        </router-link>
      </li>

      <!-- Nav Item - Charts -->
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'Charts' }">
          <i class="fas fa-fw fa-chart-area"></i>
          <span>Charts</span>
        </router-link>
      </li>

      <!-- Nav Item - Tables -->
      <li class="nav-item">
        <router-link
          class="nav-link"
          :to="{ name: 'Tables', params: { id: 'fb' } }"
        >
          <i class="fas fa-fw fa-table"></i>
          <span>Tables </span>
        </router-link>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider d-none d-md-block" />

      <!-- Sidebar Toggler (Sidebar) -->
      <div class="text-center d-none d-md-inline">
        <button
          class="rounded-circle border-0"
          id="sidebarToggle"
          @click="clickToggle"
        ></button>
      </div>
    </ul>
    <!-- End of Sidebar -->
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Sidebar",
  setup() {
    const store = useStore();
    return {
      toggle: computed(() => store.state.toggle),
      clickToggle: () => {
        store.commit("toggleval");
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
