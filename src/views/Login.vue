<template>
    <div class="containerLogin">
        <div class="warpLogin">
            <form>
                <div id="loginHeader">
                    LOGIN
                </div>
                    <input type="text" placeholder="Username" required />
                    <input type="password" placeholder="Password" required />
                <button>LOGIN</button>
            </form>
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
        margin-top:80px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width:340px;
    }

    .warpLogin {
        padding-top: 50px;
        padding-bottom: 90px;
    }

    #loginHeader{
        margin-bottom: 50px;
        font-size: 30px;
        font-weight: 400;
        color: #707070;
    }

    .warpLogin input{
        display: block;
        margin-bottom: 16px;
        width:100%;
        height: 60px;
        border: none;
        background: whitesmoke;
        font-size: 18px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .warpLogin button{
        width:100%;
        height: 60px;
        margin-top: 40px;
        background-color: #171463;
        border: none;
        color: whitesmoke;
        font-size: 16px;
        cursor: pointer;
        transition-duration: 0.4s;
        -webkit-transition-duration: 0.4s;
    }
.warpLogin button:hover{
    background-color: lighten($color: #171463, $amount: 20);
}

</style>