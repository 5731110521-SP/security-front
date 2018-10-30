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
#navbar {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  background-color: #1c2c83;
  z-index: 10;
}

#navbar #left {
  width: auto;
  display: flex;
  align-items: center;
  padding: 20px;
  padding-left: 30px;
  color: white;
  font-size: 25px;
}

#navbar #left object {
  margin-right: 15px;
}

#navbar #right {
  margin-right: 20px;
  width: auto;
  display: flex;
  align-items: center;
  padding: 20px;
  color: white;
  font-size: 15px;
}

#navbar #right * {
  margin: 30px;
  font-size: 18px;
}

#navbar #right i {
  font-size: 30px;
}

#navbar #right button {
  all: unset;
  box-sizing: border-box;
  color: white;
  border: 3px solid white;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
}

#navbar #right button i {
  font-size: 20px;
  margin: 0;
}

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
