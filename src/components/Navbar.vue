<template>
    <div id='navbar'>
        <div id='left'>
            <img src="../assets/logo_sansiri-ratina.png">
            Security Tracking
        </div>
        <div id='right'>
            <i class="fas fa-user"></i> Admin
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Navbar',
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style>
#navbar #left img {
  width: 40px;
  height: 40px;
  margin-right: 30px;
}

#navbar #right i {
  font-size: 15px;
  margin-right: 10px;
}
</style>
