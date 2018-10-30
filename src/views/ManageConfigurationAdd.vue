<template>
    <div class="page">
        <header id="addNewFunction1Header" style="padding-bottom:0;">
            <div class="contentHeader">
                <div class="mainHeader">
                    New Function
                </div>
                <div class="description">
                    for add new Function to system .
                </div>
            </div>
            <div class="left_input" style="border-top:1px solid #00000063"></div>
        </header>
        <content id="addNewFunction1Content" style="font-size:20px;justify-items:center;width:60%">
            <div style="width:100%;">
                <form @submit.prevent="validateBeforeSubmitAdd">
                    <div style="display:flex;justify-content:space-between;">SystemName* :
                        <select v-model="selectSystemName">
                            <option v-for="data in responseForShowInApplicationDropdown" :key="data.id" v-bind:value="data.id">{{data.name}}</option>
                        </select>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-top:20px">FunctionName* :
                        <input style="margin-left:10px" type="textbox" v-model="FunctionName" v-validate="'required|alpha'" name="functionName1" :class="errors.has('functionName1')? 'redbg':''">
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-top:20px">Remark
                        <input style="margin-left:10px" type="textbox" v-model="Remark" >
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-top:20px" >StorePoc
                        <select v-model="selectStoreProc">
                            <option v-for="i in responseForStoreProcDropDown" :key="i.name" v-bind:value="i.name">{{i.name}}</option>
                        </select>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-top:20px">
                        <input type="checkbox" id="checkbox" v-model="allowMultipleAdd">
                        AllowMultipleAdd
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-top:20px">
                        <input type="checkbox" id="checkbox" v-model="viewCheck">
                        ViewSearch
                        <select v-model="selectView">
                            <option v-for="i in responseForViewDropdown" :key="i.name" v-bind:value="i.name">{{i.name}}</option>
                        </select>
                    </div>
                </form>
                <div style="display:flex;justify-content:space-evenly;margin-top:30px">
                    <button class="submitBtnInPopUp" style="background:#c9465d;" value="close">cancel</button>
                    <form @submit.prevent="validateBeforeSubmitAdd">
                        <button class="submitBtnInPopUp" style="background:#3769ba;" value="submit">submit</button>
                    </form>
                </div>
            </div>
        </content>
        <header id="addNewFunction2Header" style="visibility:hidden;padding-bottom:0;">
            <div class="contentHeader">
                <div class="mainHeader">
                    New Function
                </div>
                <div class="description">
                    for add new Function to system .
                </div>
            </div>
            <div class="left_input" style="border-top:1px solid #00000063"></div>
        </header>
        <content id="addNewFunction2Content" style="visibility:hidden;font-size:20px;justify-items:center;width:60%;">
            <table >
                <thead>
                    <tr style="display: flex;justify-content: space-between;width: 100%;border: none;">
                        <th>Paramenter Name</th>
                        <th>Display Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="display: flex;justify-content: space-between;width: 100%;border: none;" v-for="(i,index) in responseShowInput" :key="index">
                        <td >{{i.name}}</td>
                        <td><input type="textBox" v-model="i.displayName"></td>
                    </tr> 
                </tbody>
            </table>
            <div style="display:flex;justify-content:space-around;margin-top:30px">
                <button class="submitBtnInPopUp cancelBtn" value="close">cancel</button>
                <button class="submitBtnInPopUp" value="submit">submit</button>
            </div>
        </content>
    </div>
</template>

<script>
    export default {
        name: 'ManageConfiguration',
    }
</script>

<style>
</style>
