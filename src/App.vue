<template>
  <div id="app">
    <navbar />
    <sidebar v-if="!isLoginPage" />
    <router-view v-if="!isLoginPage"/>
    <login v-if="isLoginPage" />
    <errorModal :messageErrorHeader="messageErrorHeader" :messageErrorContent="messageErrorContent" />
  </div>
</template>

<script>
import login from "./views/Login";
import navbar from "./components/Navbar";
import sidebar from "./components/Sidebar";
import errorModal from "./components/ErrorModal";
export default {
  name: "App",
  components: {
    login,
    navbar,
    sidebar,
    errorModal
  },
  computed: {
    isLoginPage() {
      return this.$route.path == "/login";
    }
  },
  data() {
    return {
      messageErrorHeader: "Error message",
      messageErrorContent: ""
    };
  },
  methods: {
    messageError(header, content) {
      this.showPopUp("errorModal");
      this.messageErrorHeader = header;
      this.messageErrorContent = content;
    },
    showPopUp(id) {
      document.getElementById(id).style.display = "flex";
    },
    closePopUp(id) {
      document.getElementById(id).style.display = "none";
    },
    toggleSidebar() {
      document.getElementById("sidebar").classList.toggle("active");
    }
  }
};
</script>

<style>
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700");
@import url("https://fonts.googleapis.com/css?family=Kanit:400,700");
</style>

<style lang="scss">
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #707070;
}

body {
  margin: 0px;
}
</style>