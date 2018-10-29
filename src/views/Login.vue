<template>
    <div class="containerLogin">
        <div class="warpLogin">
            <form>
                <div id="loginHeader">
                    Login
                </div>
                <div>
                    asd
                    <!-- <input type="text" placeholder="Username"/>
                    <input type="password" placeholder="Password"/> -->
                </div>
                <button>Login</button>
            </form>
        </div>
        <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {};
        },
        created() {
            console.log(this.$route);
        },
        methods: {}
    };
</script>

<style lang="scss">
    .containerLogin {
        position: fixed;
        top: 50%;
        left: 50%;
    }

    .warpLogin {
        padding-top: 50px;
        padding-bottom: 90px;
        
    }

    .warpLogin form span{
        width: 100%;
        padding-bottom: 100px;
    }
    .warpLogin form div input{
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        background: gainsboro;
        box-sizing: border-box;
    }
    .warpLogin form button{
        width: 100%;
    }
</style>