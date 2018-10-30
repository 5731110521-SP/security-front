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
        <content>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th class="cursorP" rowspan="2" @click="sort_('appName')">SystemName <i ref='appName' :class="['fas' ,'fa-sort'+di.appName]"></i></th>
                        <th class="cursorP" rowspan="2" @click="sort_('name')">FunctionName <i ref='name' :class="['fas' ,'fa-sort'+di.name]"></i></th>
                        <th rowspan="2">Remark</th>
                        <th rowspan="2">Edit</th>
                        <th rowspan="2">Delete</th>
                    </tr>
                </thead>
                <tr></tr>
                <tbody>
                    <tr v-for="(data, index) in responseForTable" :key='index'>
                        <td v-if="sortDirection == 'asc'">{{index+1+(currentPage-1)*pageSize}}</td>
                        <td v-else>{{count-(index+(currentPage-1)*pageSize)}}</td>
                        <td>{{ data.application.name}}</td>
                        <td>{{ data.name }}</td>
                        <td>{{ data.remarks }}</td>
                        <td><i class="far fa-edit editHover" style="width:15px;height:15px;cursor:pointer" 
                        v-on:click="edit(data.id)"></i></td>
                        <td><i class="fas fa-trash-alt deleteHover" style="width:15px;height:15px;cursor:pointer;" 
                        v-on:click="deleteRecord(data.application.name,data.name,data.remarks,data.id)"></i></td>
                    </tr>
                </tbody>
            </table>
            <div>
                <div class="pagination">
                    <a v-if="currentPage != 1" v-on:click="changePage(currentPage-1)">&laquo;</a>
                    <a v-for="(i,index) in totalPage" :key="index" :class="i == currentPage? 'active':''" v-on:click="changePage(i)">{{i}}</a>
                    <a v-if="currentPage != totalPage" v-on:click="changePage(currentPage+1)">&raquo;</a>
                </div>
            </div>
        </content>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },

  data() {
    return {
      querySearch:'',
      di:{appName:'',name:''},
      sortBy:'',
      sortDirection:'',
      Name: "",
      Host: "",
      Remark: "",
      Username: "",
      Password: "",
      FunctionName: "",
      ID: 0,
      valueForSearch: "",
      responseForTable: [],
      currentPage: 1,
      totalPage: 0,
      pageSize: 5,
      method: "add",
      responseForShowInApplicationDropdown: [],
      searchOption: [
        {
          key: "applicationProfileName",
          text: "SystemName",
          value: "appName"
        },
        { key: "name", text: "FunctionName", value: "name" }
      ],
      multiselectForSearch: [],
      FunctionName: "",
      Remarks: "",
      count:0,
      SystemName:''
    };
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      };
      this.options.push(tag);
      this.value.push(tag);
    },
    async addFunction() {
      router.push('/adminToolsNewfunctionAdd')
    },
    showPopup(popUpName) {
      document.getElementById(popUpName).style.display = "flex";
    },
    closePopUp(popUpName) {
      this.SystemName = "";
      this.Database = "";
      this.Port = "";
      this.IPAddress = "";
      this.Username = "";
      this.Password = "";

      document.getElementById(popUpName).style.display = "none";
    },

    async edit(ID) {
      router.push('/adminToolsNewFunctionEdit/'+ID);
    },
    deleteRecord(SystemName, FunctionName, Remarks, ID) {
      this.SystemName = SystemName;
      this.FunctionName = FunctionName;
      this.Remarks = Remarks;
      this.ID = ID;

      this.showPopup("popUpConfirmDelete");
    },
    async editApplicationProfile() {
      let editApplicationProfile = {
        Name: this.SystemName,
        DBName: this.Database,
        Port: Number(this.Port),
        Host: this.IPAddress,
        Username: this.Username,
        Password: this.Password
      };

      if (
        this.SystemName != "" &&
        this.Database != "" &&
        this.Port != "" &&
        this.IPAddress != "" &&
        this.Username != "" &&
        this.Password != ""
      ) {
        await this.$http.put(
          "/application-profile/" + this.ID,
          editApplicationProfile
        );

        const dataForTable = await this.$http.get(
          "/application-profile?pageSize=" +
            this.pageSize +
            "&page=" +
            this.currentPage
        );
        this.responseForTable = dataForTable.data.Functions;
        this.totalPage = dataForTable.data.TotalPage;
        this.count = dataForTable.data.count;

        this.SystemName = "";
        this.Database = "";
        this.Port = "";
        this.IPAddress = "";
        this.Username = "";
        this.Password = "";
        this.ID = 0;

        this.closeEditPopUp();
      }
    },

    async changePage(i) {
      this.currentPage = i;

      const data = await this.$http.get(
        "/function/page/" + this.currentPage + "?pageSize=" + this.pageSize+"&sortBy="+this.sortBy+"&direction="+this.sortDirection
      );
      this.count = data.data.count;
      this.responseForTable = data.data.functions;
      this.responseForShowInApplicationDropdown = data.data.function;
      this.totalPage = data.data.totalPage;
    },
    async sort_(id){
      if(id != 'name')
        this.di['name']='';
      if(id != 'appName')
        this.di['appName']='';
      else{}
        console.log("id : "+id);
        console.log("this.[id] : "+this.di[id]);

      var data;
      this.sortBy=id;
      if(this.di[id] == '-up sortUpAnimation'){
        this.di[id] = '-down sortDownAnimation'
        this.sortDirection = 'desc';
        data = await this.$http.get(
      "/function/page/1?pageSize=" + this.pageSize+"&sortBy="+this.sortBy+"&direction="+this.sortDirection+"&"+this.querySearch);
      
      }else{
        this.di[id] = '-up sortUpAnimation'
        this.sortDirection = 'asc';
        data = await this.$http.get(
      "/function/page/1?pageSize=" + this.pageSize+"&sortBy="+this.sortBy+"&direction="+this.sortDirection+"&"+this.querySearch);
      
      }
      this.count = data.data.count;
      this.responseForTable = data.data.functions;
      this.totalPage = data.data.totalPage;
       
       this.$refs[id]
    },
    async search(){
      var i;

      for (i = 0; i < this.multiselectForSearch.length; i++) {
        if (i == 0)
          this.querySearch +=
            this.multiselectForSearch[i] + "=" + this.valueForSearch;
        else
          this.querySearch +=
            "&" + this.multiselectForSearch[i] + "=" + this.valueForSearch;
      }
      const response = await this.$http.get(
        "/function/page/1?" + this.querySearch + "&pageSize=" + this.pageSize
      );
      this.count = response.data.count;
      this.responseForTable = response.data.functions;
      this.totalPage = response.data.totalPage;
    }
  },
  async mounted() {

  },

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
</style>

