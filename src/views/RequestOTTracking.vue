<template>
  <div class="page requestOTTracking">
    <header>
      <div class="contentHeader">
        <div class="mainHeader">Request OT Tracking</div>
        <div class="description">for search OT log .</div>
      </div>
      <div class="searchBy">
        <a>Search By:</a>
        <sui-dropdown class="left_input" fluid multiple :options="searchOptions" placeholder="Search by..." selection
          v-model="searchByRaw" />
        <a></a>
        <input class="right_input" v-model="searchValue" placeholder="search...">
        <a>Condition</a>
        <sui-dropdown placeholder="Select Mode" selection :options="options" v-model="condition" />
      </div>
      <div class="searchDateTime">
        <a>Date From: </a>
        <date-picker style="width:100%" v-model="date_from" lang="en" type="datetime" format="MM-DD-YYYY [at] HH:mm:ss"
          confirm></date-picker>
        <a></a>
        <a class="input_name">To: </a>
        <date-picker style="width:100%" v-model="date_to" lang="en" type="datetime" format="MM-DD-YYYY [at] HH:mm:ss"
          confirm></date-picker>
      </div>
      <div class="searchAction">
        <a>Action: </a>
        <sui-dropdown placeholder="Select Action" selection :options="actionOptions" v-model="action" />
      </div>
      <button class="searchButton" @click="search">Search</button>
    </header>
    <div class="content">
      <div class="lds-ellipsis" v-if="isLoading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div v-else>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Memo No.</th>
              <th>Action Name</th>
              <th>Action By</th>
              <th>Action Date/Time</th>
              <th>Status</th>
              <th>Error Message</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data,index) in responseForTableWithNo" :key="index">
              <td v-if="data.no" :rowspan="data.no.count">{{data.no.numberCount}}</td>
              <td>{{ data.memonum }}</td>
              <td>{{ data.action }}</td>
              <td>{{ data.firstname }} {{ data.lastname }}</td>
              <td>{{ data.datetime }}</td>
              <td :class="data.status=='Error'?'red-text':''">{{ data.status }}</td>
              <td>
                <input class="red-text" :value="data.errmsg" disabled />
              </td>
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
  </div>
</template>

<script>
  import DatePicker from "vue2-datepicker";

  export default {
    name: "RequestOTTracking",
    components: {
      DatePicker
    },
    data() {
      return {
        datatotal: 0,
        pageNumber: 1,
        pageSize: 10,
        searchBy: [],
        searchByRaw: [],
        searchOptions: [{
            text: "รหัสพนักงาน",
            key: "employee_id",
            value: "empcode"
          },
          {
            text: "ชื่อพนักงาน(ไทย)",
            key: "name_thai",
            value: "firstname"
          },
          {
            text: "นามสกุล(ไทย)",
            key: "surname_thai",
            value: "lastname"
          },
          {
            text: "Memo No.",
            key: "memo_id",
            value: "memonum"
          }
        ],
        actionOptions: [{
            text: "All",
            key: null,
            value: null
          },
          {
            text: "Create Memo",
            key: "Create Memo",
            value: "Create Memo"
          },
          {
            text: "Send Email",
            key: "Send Email",
            value: "Send Email"
          },
          {
            text: "Approve",
            key: "Approve",
            value: "Approve"
          }
        ],
        searchValue: "",
        employee_id: "",
        memo_id: "",
        name_thai: "",
        surname_thai: "",
        date_from: "",
        date_to: "",
        action: null,
        selected: "",
        responseForTable: "",
        gettime: "",
        condition: "and",
        options: [{
            text: "AND",
            value: "and"
          },
          {
            text: "OR",
            value: "or"
          }
        ],
        isLoading: true,
      }
    },
    mounted() {
      this.date_to = new Date();
      this.getTime();
    },
    watch: {
      pageNumber: "getTime"
    },
    computed: {
      responseForTableWithNo() {
        if (this.responseForTable == null) return []
        var tableWithNo = [];
        var memonum, currentMemonum = -1,
          currentStartIndex = -1,
          count = 0,
          numberCount = 1
        for (var i = 0; i < this.responseForTable.length; i++) {
          memonum = this.responseForTable[i].memonum.substring(2) * 1
          if (memonum != currentMemonum) {
            if (currentStartIndex > -1) {
              tableWithNo[currentStartIndex].no = {
                count: count,
                numberCount: numberCount
              }
              numberCount++
            }
            currentMemonum = memonum
            currentStartIndex = i
            count = 1
          } else {
            count++
          }
          tableWithNo.push(this.responseForTable[i])
        }
        if (currentStartIndex > -1) {
          tableWithNo[currentStartIndex].no = {
            count: count,
            numberCount: numberCount
          }
        }
        return tableWithNo

      },
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
        this.isLoading = true
        var result = this.searchValue.split(",");
        var datefrom = null;
        var dateto = null;
        if (this.date_from != "" && this.date_from != null)
          datefrom = this.date_from.toISOString();
        if (this.date_to != "" && this.date_to != null)
          dateto = this.date_to.toISOString();

        this.$http
          .get("security-requestotlogtracking", {
            params: {
              fields: this.searchByRaw,
              value: result,
              action: this.action,
              fromdatetime: datefrom,
              todatetime: dateto,
              condition: this.condition,
              pagenumber: this.pageNumber,
              pagesize: this.pageSize
            }
          })
          .then(response => {
            if (response.data == null) {
              this.responseForTable = [];
              this.datatotal = 0;
            } else {
              this.responseForTable = response.data.logtracking;
              this.datatotal = response.data.total;
            }
            this.isLoading = false
          })
          .catch(function (error) {
            vm.$parent.messageError(error.message, error.response.data)
            vm.isLoading = false
          });
      },
      getParams() {
        this.searchBy = [];
        this.searchByRaw.forEach(element => {
          this.searchBy.push(element.code);
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
      search() {
        if (this.pageNumber == 1) this.getTime();
        else this.pageNumber = 1;
      }
    }
  };
</script>

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

  .content table {
    counter-reset: no;
  }

  .content .pagination-content {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
  }

  .page.requestOTTracking header {
    grid-row-gap: 10px;
    grid-template-columns: 60% auto;
    grid-template-areas:
      "contentHeader ."
      "searchBy searchBy"
      "searchDateTime searchDateTime"
      "searchAction searchAction"
      "searchButton .";
  }

  .page header .searchBy {
    grid-area: searchBy;
    display: grid;
    grid-row-gap: 10px;
    grid-template-columns: 10% 20% 35%;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      ". left_input left_input"
      ". right_input right_input"
      ". . .";
  }

  .page header .searchDateTime {
    grid-area: searchDateTime;
    display: grid;
    grid-template-columns: 10% 20% 10% 5% 20%;
    grid-template-rows: auto;
  }

  .page header .searchDateTime date-picker {
    width: 100%;
  }


  .page header .searchAction {
    grid-area: searchAction;
    display: grid;
    grid-template-columns: 10% 20%;
    grid-template-rows: auto;
  }

  .page.requestOTTracking header .searchButton {
    width: 200px;
  }

  .page.requestOTTracking .content table tbody tr .red-text {
    color: #e24c4b;
  }

  .page.requestOTTracking .content table tbody tr input.red-text {
    max-width: 300px;
    border: none;
    cursor: text;
    background: transparent;
  }

  .page.requestOTTracking .content table tbody tr input.red-text:focus {
    border-right: 1px solid black;
  }
</style>