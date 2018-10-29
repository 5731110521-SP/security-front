<template>
    <div id="sidebar">
        <div class="toggle-btn" @mouseover="toggleSidebar()">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul>
            <li>
                <router-link to="customerDataTracking" class="smallList">
                    Customer Data Tracking
                    <i class="fas fa-arrow-right"></i>
                </router-link>
                <router-link to="requestOTTracking" class="smallList">
                    Request OT Tracking Log
                    <i class="fas fa-arrow-right"></i>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Sidebar',
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style>

#sidebar .smallList {
  margin-top: 15px;
}

#sidebar {
  position: absolute;
  width: 20%;
  height: 80%;
  top: 80px;
  background: #ffffff;
  transition: all 500ms linear;
  text-align: left;
  margin-left: -20px;
}

#sidebar ul li {
  color: #151719 0.8;
  list-style: none;
  padding: 15px;
  font-size: 25px;
}

.smallList {
  font-size: 15px;
  color: #707070;
  cursor: pointer;
  margin-left: 10px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.3);
  margin-left: 0px;
  display: flex;
  padding-bottom: 10px;
  justify-content: space-between;
}
</style>
