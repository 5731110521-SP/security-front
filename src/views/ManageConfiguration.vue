<template>
    <div class="page manageConfiguration">
        <header>
            <div class="contentHeader">
                <div class="mainHeader">Configuration Management</div>
                <div class="description">for create new configuration . </div>
            </div>
            <button class="addButton" v-on:click="addFunction()">New Configuration</button>
            <sui-dropdown
                fluid
                multiple
                :options="searchOption"
                placeholder="Search by..."
                selection
                v-model="searchBy"
                class="left_input"
                style="height:auto"
            />
            <input class="right_input" placeholder="search..." v-model="searchValue" >
            <button class="searchButton" @click="search()">Search</button>
        </header>
        <div class="content">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>SystemName</th>
                        <th>ConfigurationName</th>
                        <th>Value</th>
                        <th>CreatedDate</th>
                        <th>LastModified</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tr></tr>
                <tbody>
                    <tr v-for="(data, index) in responseForTable" :key='index'>
                        <td>{{(pageNumber-1)*pageSize+index+1}}</td>
                        <td>{{ data.sysname}}</td>
                        <td>{{ data.configurationname }}</td>
                        <td>{{ data.value }}</td>
                        <td>{{ data.createddate }}</td>
                        <td>{{ data.lastmodified }}</td>
                        <td><i class="far fa-edit editHover" style="width:15px;height:15px;cursor:pointer" 
                        v-on:click="edit(data.id,data.sysname,data.configurationname,data.value)"></i></td>
                        <td><i class="fas fa-trash-alt deleteHover" style="width:15px;height:15px;cursor:pointer;" 
                        v-on:click="deleteRecord(data.id,data.sysname,data.configurationname,data.value)"></i></td>
                    </tr>
                </tbody>
            </table>
            <div class="emptyState" v-if="datatotal == 0">
                <img src="../assets/log-file-format.png">
                <p>No result were found .</p>
            </div>
            <div class="pagination-content" v-else>
                <div class="pagination">
                    <a :class="pageNumber==1?'hidden':''" @click="pageBack">&laquo;</a>
                    <a :class="i==pageNumber?'active':''" v-for="i in computedPageNumberMax" :key="i" @click="pageGo(i)">{{i}}</a>
                    <a :class="pageNumber==computedPageNumberMax?'hidden':''" @click="pageNext">&raquo;</a>
                </div>
            </div>
        </div>
        <div class="popupModal" id="popUpConfirmDelete"  >
            <div class="popupBody headerThai" style="display:flex;justify-content:center;flex-direction:column;align-items:space-around;" >
                Are you sure to delete this record ?
                <div style="display:flex;justify-content:space-between;margin-top:40px;width:100%;flex-direction:row;">
                    <div>SystemName :</div>
                    <div>{{this.SYS}}</div>
                </div>
                <div style="display:flex;justify-content:space-between;margin-top:30px;width:100%;flex-direction:row;">
                    <div>ConfigurationName :</div>
                    <div>{{this.CONFIG}}</div>
                </div>
                <div style="display:flex;justify-content:space-between;margin-top:30px;width:100%;flex-direction:row;">
                    <div>Value :</div>
                    <div>{{this.VALUE}}</div>
                </div>
                <div style="display:flex;justify-content:space-evenly;margin-top:30px">
                    <button class="submitBtnInPopUp cancelBtn"  v-on:click="closePopUp('popUpConfirmDelete')">cancel</button>
                    <button class="submitBtnInPopUp"  style="background:#C44536;" v-on:click="confirmDeleteApplicationProfile()">delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from "./../router.js"

export default {
  name: "ManageConfiguration",
  props: {
    msg: String
  },

  data() {
    return {
        datatotal: 0,
        pageNumber: 1,
        pageSize: 10,
        responseForTable: "",
        dataid:"",
        sysname: "",
        configurationname: "",
        datavalue: "",
        searchBy: [],
        searchValue: '',
        ID: "",
        SYS: "",
        CONFIG: "",
        VALUE: "",
        searchOption: [
            {
            key: "SystemName",
            text: "SystemName",
            value: "sysname"
            },
            { key: "ConfigurationName", text: "ConfigurationName", value: "configurationname" }
        ],
    };
  },
  mounted() {
      this.getTime();
    },
    watch: {
      pageNumber: "getTime"
    },
    computed: {
      computedPageNumberMax: function () {
        var floor = Math.floor(this.datatotal / this.pageSize);
        if (this.datatotal / this.pageSize > floor) {
          return floor + 1;
        } else {
          return floor;
        }
      }
    },
    methods: {
        getTime() {
            var vm = this

            this.$http
            .get("security-config", {
                params: {
                fields: this.searchBy == [] ? null : this.searchBy,
                value: this.searchValue == '' ? null : this.searchValue,
                pagenumber: this.pageNumber,
                pagesize: this.pageSize
                }
            })
            .then(response => {
                if (response.data == null) {
                this.responseForTable = [];
                this.datatotal = 0;
                } else {
                this.responseForTable = response.data.configuration;
                this.dataid = response.data.configuration.id
                this.sysname = response.data.configuration.sysname
                this.configurationname = response.data.configuration.configurationname
                this.datavalue = response.data.configuration.value
                this.datatotal = response.data.total;
                }
            })
            .catch(function (error) {
                vm.$parent.messageError(error.message, error.response.data)
            });
        },
        pageBack() {
            if (this.pageNumber == 1) return;
            this.pageNumber -= 1;
        },
        pageNext() {
            if (this.pageNumber == this.computedPageNumberMax) return;
            this.pageNumber += 1;
        },
        pageGo(i) {
            this.pageNumber = i;
        },
        isSameMemonumAsBefore(index) {
            if (index != 0) {
            if (
                this.responseForTable[index].id ==
                this.responseForTable[index - 1].id
            ) {
                return true;
            }
            }
            return false;
        },
        getRowspan(index) {
            var currentMemonum = this.responseForTable[index].id;
            var rowspan = 0;
            for (var i = index; i < this.responseForTable.length; i++) {
            if (this.responseForTable[i].id == currentMemonum) {
                rowspan++;
            } else {
                break;
            }
            }
            return rowspan;
        },
        search() {
            if (this.pageNumber == 1) this.getTime();
            else this.pageNumber = 1;
        },
        addFunction() {
            router.push('/ManageConfigurationAdd');
        },
        async edit(ID,SystemName,ConfigurationName,Value) {
            router.push({name:'manageConfigurationEdit', params:{ ID,SystemName,ConfigurationName,Value }});
        },
        deleteRecord(ID,SystemName,ConfigurationName,Value) {
            this.ID = ID
            this.SYS = SystemName
            this.CONFIG = ConfigurationName
            this.VALUE = Value
            this.showPopup("popUpConfirmDelete"); 
        },
        showPopup(popUpName) {
            document.getElementById(popUpName).style.display = "flex";
        },
        closePopUp(popUpName) {
            this.ID = ""
            this.SYS = ""
            this.CONFIG = ""
            this.VALUE = ""
            document.getElementById(popUpName).style.display = "none";
        },
        async confirmDeleteApplicationProfile() {
            var body = {
                data:{id: this.ID}
            } 
            await this.$http
            .delete("security-config", body)
            .then(response => {
                if (response.data == null) {

                } else {
                    this.getTime()
                }
            })
            // await this.$http.delete("/function/" + this.ID);

            this.closePopUp("popUpConfirmDelete");
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pagination {
  margin-top: 10px;
  display: inline-block;
  align-content: center;
}

.pagination a {
  color: black;
  float: left;
  padding: 5px 11px;
  text-decoration: none;
  cursor: pointer;
  font-size: 15px;
}

.pagination a.active {
  background-color: #1c2c83;
  color: white;
  border-radius: 5px;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
  border-radius: 5px;
}

.page.manageConfiguration header {
    grid-template-areas:
        "contentHeader contentHeader . addButton"
        "left_input right_input right_input searchButton";
}

.content .pagination-content {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
}

.content .emptyState img{
    margin: 30px;
    height: 100px;
}

.content .emptyState p{
    color: gainsboro;
    font-size: 18px;
}

.editHover {
  color: #878787;
}

.editHover:hover {
  color: #ffa136;
}

.deleteHover {
  color: #878787;
}

.deleteHover:hover {
  color: #ff2e2e;
}

.cancelBtn {
  background: #a1a1a1;
}
.cancelBtn:hover {
  background: #c6c6c6;
}

.cursorP{
  cursor: pointer;
}

.headerThai {
  font-family: "Kanit", sans-serif;
}

.popupModal {
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

.popupBody {
  width: auto;
  height: auto;
  background: #ffffff;
  border-radius: 5px;
  border: none;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: space-around;
  width: 40%;
  height: auto;
  font-size: 20px;
  padding: 40px 70px 40px 70px;
}
</style>

