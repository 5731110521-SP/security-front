<template>
  <div class="modal" id="errorModal">
    <div class="modelContent">
      <div class="modalBody">
        <img src="../assets/warning.png">
        <p>{{messageErrorHeader}}</p>
        <p>{{messageErrorContent}}</p>
      </div>
      <div class="modalFooter" @click="closePopUp('errorModal')">
        OK
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ErrorModal',
    props: ["messageErrorHeader", "messageErrorContent"],
    data() {
      return {}
    },
    methods: {
      closePopUp(id) {
        document.getElementById(id).style.display = 'none'
      }
    }
  }
</script>

<style>

.modal {
  background-color: rgba(0, 0, 0, 0.822);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.modal .modelContent {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
}

@-webkit-keyframes animatetop {
  from {
    top: 0;
    opacity: 0;
  }

  to {
    top: 50%;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: 0;
    opacity: 0;
  }

  to {
    top: 50%;
    opacity: 1;
  }
}

.modal .modelContent .modalBody {
  max-width: 100%;
  padding: 30px 10px;
  color: #151719;
  font-size: 18px;
}

.modal .modelContent .modalFooter {
  padding: 20px 150px;
  background-color: #e24c4b;
  color: whitesmoke;
  border-radius: 0px 0px 5px 5px;
}

.modal .modelContent .modalFooter:hover:not(.active) {
  background-color: darken(#e24c4b, 5%);
}
</style>
