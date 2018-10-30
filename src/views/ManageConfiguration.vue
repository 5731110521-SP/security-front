<template>
    <div class="page manageConfiguration">
        <header>
            <div class="contentHeader">
                <div class="mainHeader">Function Management</div>
                <div class="description">for create new configuration about database . </div>
            </div>
            <sui-dropdown
                fluid
                multiple
                :options="searchOption"
                placeholder="Pick some.."
                selection
                v-model="multiselectForSearch"
                class="left_input"
                style="height:auto"
            />
            <input class="right_input" placeholder="search..." v-model="valueForSearch" >
            <button class="searchButton" @click="search()">Search</button>
            <button class="addButton submitBtn" v-on:click="addFunction()">New Function</button>
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
                        <td class="no" v-if="!isSameMemonumAsBefore(index)" :rowspan="getRowspan(index)"></td>
                        <td>{{ data.sysname}}</td>
                        <td>{{ data.configurationname }}</td>
                        <td>{{ data.value }}</td>
                        <td>{{ data.createddate }}</td>
                        <td>{{ data.lastmodified }}</td>
                        <td><i class="far fa-edit editHover" style="width:15px;height:15px;cursor:pointer" 
                        v-on:click="edit(data.id,data.sysname,data.configurationname,data.value)"></i></td>
                        <td><i class="fas fa-trash-alt deleteHover" style="width:15px;height:15px;cursor:pointer;" 
                        v-on:click="deleteRecord(data.id)"></i></td>
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
        multiselectForSearch: [],
        dataid:"",
        sysname: "",
        configurationname: "",
        datavalue: "",
        searchOption: [
            {
            key: "applicationProfileName",
            text: "SystemName",
            value: "appName"
            },
            { key: "name", text: "FunctionName", value: "name" }
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
            router.push({path:'/ManageConfigurationEdit', params:{ID,SystemName,ConfigurationName,Value}});
        },
        deleteRecord(ID) {
            var body = {
                data:{id: ID}
            }
            this.$http
            .delete("security-config", body)
            .then(response => {
                if (response.data == null) {
                // this.responseForTable = [];
                // this.datatotal = 0;
                } else {
                    this.getTime()
                }
            })
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
@import url("https://fonts.googleapis.com/css?family=Kanit:400,700");

.submitBtnInPopUp {
  /* margin-top: 30px; */
  font-family: "Montserrat", sans-serif;
  width: auto;
  height: auto;
  background: #1c2c83;
  color: #ffffff;
  /* margin: 10px; */
  cursor: pointer;
  border-radius: 2px;
  border: none;
  padding: 15px 30px 15px 30px;
}

.submitBtnInPopUp:hover {
  background: #22349b;
  color: #ffffff;
}

.headerThai {
  font-family: "Kanit", sans-serif;
}

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
</style>

