<template>
    <div class="page customerDataTracking">
        <header>
            <div class="contentHeader">
                <div class="mainHeader">
                    Customer Data Tracking
                </div>
                <div class="description">
                    for search customer data log .
                </div>
            </div>
            <sui-dropdown class="left_input" fluid multiple :options="searchOptions" placeholder="Search By" selection
                v-model="searchBy" />
            <input class="right_input" v-model="searchValue" placeholder="search...">
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
                            <th>No</th>
                            <th>Timestamp</th>
                            <th @click="sort_('sysname')">System Name<i ref="sysname" :class="['fas','fa-sort'+sort.sysname]"></i></t>
                            <th @click="sort_('user')">User<i ref="user" :class="['fas','fa-sort'+sort.user]"></i></th>
                            <th @click="sort_('ipaddress')">IP<i ref="ipaddress" :class="['fas','fa-sort'+sort.ipaddress]"></i></th>
                            <th @click="sort_('action')">Action<i ref="action" :class="['fas','fa-sort'+sort.action]"></i></th>
                            <th>Customer Data</th>
                            <th>Custom Field</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in datalist" :key="index">
                            <td>{{(pageNumber-1)*pageSize+index+1}}</td>
                            <td>{{item.createddate}}</td>
                            <td>{{item.sysname}}</td>
                            <td>{{item.user}}</td>
                            <td>{{item.ipaddress}}</td>
                            <td>{{item.action}}</td>
                            <td style="max-width:300px">
                                <div v-for="(data,index) in item.customerdata" :key="index">
                                    <div v-for="(value,key) in data" :key="key">
                                        {{key}} : {{value}}
                                    </div>
                                </div>
                            </td>
                            <td style="max-width:300px">
                                <div v-for="(value,key) in item.customfield" :key="key">
                                    {{key}} : {{value}}
                                </div>
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
    export default {
        name: 'CustomerDataTracking',
        data() {
            return {
                datalist: [{
                    createddate: '2018-09-27T14:14:14+07:00',
                    sysname: 'CRM',
                    user: 'PanuvitV',
                    ipaddress: '192.9.0.122',
                    action: 'Search',
                    customerdata: [{
                        "CustomerID": "John",
                        "PassportID": "11038488472733",
                        "a": "a",
                        "b": "b"
                    }],
                    customfield: {
                        "QuotationNo": "1208317474",
                        "Date": "9/27/2018"
                    },
                }],
                datatotal: 0,
                pageNumber: 1,
                pageSize: 10,
                searchBy: [],
                searchOptions: [{
                        text: 'System Name',
                        key: 'sysname',
                        value: 'sysname'
                    },
                    {
                        text: 'User',
                        key: 'user',
                        value: 'user'
                    },
                    {
                        text: 'IP Address',
                        key: 'ipaddress',
                        value: 'ipaddress'
                    },
                    {
                        text: 'Action',
                        key: 'action',
                        value: 'action'
                    }
                ],
                searchValue: '',
                isLoading: true,
                sort:{
                    sysname:'',
                    user:'',
                    ipaddress:'',
                    action:'',

                },
                sortDirection: null,
                sortBy: null,
            }
        },
        watch: {
            pageNumber: "getData"
        },
        computed: {
            computedPageNumberMax: function () {
                var floor = Math.floor(this.datatotal / this.pageSize)
                if (this.datatotal / this.pageSize > floor) {
                    return floor + 1
                } else {
                    return floor
                }
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                var vm = this
                this.isLoading = true
                this.$http.get('security-logtracking', {
                        params: {
                            fields: this.searchBy,
                            value: this.searchValue == '' ? null : this.searchValue,
                            pagenumber: this.pageNumber,
                            pagesize: this.pageSize,
                            sortby: this.sortBy,
                            direction: this.sortDirection,
                        }
                    })
                    .then(response => {
                        if (response.data == null) {
                            vm.datalist = []
                            vm.datatotal = 0
                        } else {
                            vm.datalist = response.data.logtracking
                            vm.datatotal = response.data.total
                        }
                        this.isLoading = false
                    })
                    .catch(function (error) {
                        vm.$parent.messageError(error.message, error.response.data)
                        vm.isLoading = false
                    })
            },
            handleSubmit() {
                this.getData()
            },
            pageBack() {
                if (this.pageNumber == 1) return
                this.pageNumber -= 1
            },
            pageNext() {
                if (this.pageNumber == this.computedPageNumberMax) return
                this.pageNumber += 1
            },
            pageGo(i) {
                this.pageNumber = i
            },
            search() {
                if (this.pageNumber == 1) this.getData()
                else this.pageNumber = 1
            },
            sort_(id){
                var value = this.sort[id]
                this.sort.sysname=''
                this.sortBy=id
                if(value=='-up sortUpAnimation'){
                    this.sort[id]= '-down sortDownAnimation'
                    this.sortDirection = 'desc'
                }else{
                    this.sort[id] = '-up sortUpAnimation'
                    this.sortDirection = 'asc'
                }
                this.getData()
            }
        },
    }
</script>

<style>
    .pagination {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
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

    .page.customerDataTracking header {
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
</style>