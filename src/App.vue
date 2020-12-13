<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <div id="wrapper">
    <Sidebar />
    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <Topbar />
        <!-- Begin Page Content -->

        <router-view />
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->
    </div>
    <!-- End of Content Wrapper -->
  </div>
  <!-- End of Page Wrapper -->
  <Pagetop />
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import Pagetop from "@/components/Pagetop.vue";

export default {
  name: "Home",
  components: {
    Sidebar,
    Topbar,
    Pagetop,
  },
};
</script>


