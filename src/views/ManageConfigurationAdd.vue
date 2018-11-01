<template>
    <div class="page">
        <header>
            <div class="contentHeader">
                <div class="mainHeader">
                    New Configuration
                </div>
                <div class="description">
                    for add new configuration .
                </div>
            </div>
            <div class="left_input" style="border-top:1px solid #00000063;height:10px"></div>
        </header>
        <div class="content" id="manageConfigurationAdd">
            <div>
                <form @submit.prevent="submit">
                    <div>SystemName* :
                        <input type="textbox" required v-model="sysname">
                    </div>
                    <div>Configuration Name* :
                        <input style="margin-left:10px" type="textbox" required v-model="configurationname">
                    </div>
                    <div>Value
                        <input style="margin-left:10px" type="textbox" required v-model="value">
                    </div>
                    <div class="button-div">
                        <button class="submitBtnInPopUp" type="button" @click="routerGoBack">cancel</button>
                        <button class="submitBtnInPopUp" type="submit" value="Submit">submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            ID:String,
            SystemName:String,
            ConfigurationName:String,
            Value:String
        },
        name: 'ManageConfiguration',
        data() {
            return {
                sysname: '',
                configurationname: '',
                value: ''
            }
        },
        mounted(){
            this.sysname = this.SystemName
            this.configurationname = this.ConfigurationName
            this.value = this.Value
        },
        methods: {
            submit() {
                if (this.ID != null) {
                    this.$http.put('security-config', {
                            "id": this.ID,
                            "sysname": this.sysname,
                            "configurationname": this.configurationname,
                            "value": this.value,
                        }).then(response=>{
                            this.routerGo()
                        })
                        .catch(error => {
                            this.$parent.messageError(error.message, error.response.data)
                        });
                }
                else{
                    this.$http.post('security-config', {
                            "sysname": this.sysname,
                            "configurationname": this.configurationname,
                            "value": this.value,
                        }).then(response=>{
                            this.routerGo()
                        })
                        .catch(error => {
                            this.$parent.messageError(error.message, error.response.data)
                        });
                }
            },
            routerGoBack() {
                this.$router.go(-1)
            },
            routerGo() {
                this.$router.push('/ManageConfiguration')
            }
        }
    }
</script>

<style lang="scss">
    header{
        padding-bottom:0;
    }

    .page .content#manageConfigurationAdd{
        font-size:20px;justify-items:center;width:60%
    }

    .page .content#manageConfigurationAdd form div{
        display:flex;justify-content:space-between;margin-bottom:20px;
    }

    .page .content#manageConfigurationAdd form div.button-div{
        display:flex;justify-content:space-evenly;margin-top:30px
    }
    
    .submitBtnInPopUp {
        font-family: "Montserrat", sans-serif;
        width: auto;
        height: auto;
        background: #1c2c83;
        color: #ffffff;
        cursor: pointer;
        border-radius: 2px;
        border: none;
        padding: 15px 30px 15px 30px;
    }

    .submitBtnInPopUp[type=button]{
        background:#c9465d;
    }

    .submitBtnInPopUp[type=button]:hover{
        background: darken(#c9465d,10%);
    }

    .submitBtnInPopUp[type=submit]{
        background:#3769ba;
    }

    .submitBtnInPopUp[type=submit]:hover {
        background: darken(#3769ba,10%);
        color: #ffffff;
    }
</style>
