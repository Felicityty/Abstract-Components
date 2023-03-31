<template>
  <div class="listPage">
    <div class="listPage-search">
      <input placeholder="搜索" type="text" v-model="queryInfo.keyword" />
      <button @click="setUserList">搜索</button>
    </div>

    <div class="listTable">
      <table>
        <thead>
          <tr>
            <td>
              <input
                class="table-check"
                type="checkbox"
                v-model="isAllChecked"
              />
            </td>
            <td v-for="(title, index) in tableTitles" :key="index">
              {{ title }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filterList" :key="index">
            <td>
              <input type="checkbox" v-model="item.isChecked" />
            </td>
            <td>{{ index }}</td>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.profession }}</td>
            <td>
              <button class="table-btn" @click="showEditDialog(item)">
                编辑
              </button>
              <button class="table-btn" @click="deleteUserList(index, item.id)">
                删除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="listPagination">
      <div class="listPagination-left">
        共 <strong>{{ queryInfo.total }}</strong> 条
      </div>
      <div class="listPagination-right">
        <button @click="setCurrPage('pre'), setUserList()">pre</button>
        <span>{{ queryInfo.currentPage }} / {{ queryInfo.pageNum }}</span>
        <button @click="setCurrPage('next'), setUserList()">next</button>
        <input type="text" v-model="queryInfo.pageText" />
        <button @click="handleTurnPage()">Go</button>
      </div>
    </div>

    <div class="listEdit" v-show="isShowEdit">
      <div>更改名字为：</div>
      <input type="text" class="listEdit-input" v-model="editInfo.newName" />
      <div class="listEdit-buttons">
        <button @click="cancelEditDialog">取消</button>
        <button @click="editUserList(), closeEditDialog()">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import { userList } from "@/common/data";

export default {
  name: "ListPage",
  data() {
    return {
      filterList: [],
      tableTitles: ["Index", "ID", "Name", "Profession"],
      queryInfo: {
        keyword: "",
        pageSize: 3,
        currentPage: 1,
        pageText: "",
        pageNum: 0,
        total: 0,
      },
      isShowEdit: false,
      editInfo: {
        name: "",
        newName: "",
        tempItem: {},
      },
    };
  },
  computed: {
    isAllChecked: {
      get() {
        return this.filterList.every((item) => item.isChecked === true)
          ? true
          : false;
      },
      set(value) {
        this.filterList.forEach((item) => {
          item.isChecked = value;
        });
      },
    },
  },
  watch: {
    $route() {
      this.queryInfo.keyword = this.$router.currentRoute.query.keyword;
      this.queryInfo.currentPage = parseInt(
        this.$router.currentRoute.query.currentPage
      );
      this.setUserList();
    },
  },
  created() {
    this.setUserList();
    this.queryInfo.total = userList.list.length;
  },
  methods: {
    handleTurnPage() {
      this.queryInfo.currentPage = this.queryInfo.pageText;
      this.setUserList();
      this.queryInfo.pageText = "";
    },
    setCurrPage(page) {
      page === "pre"
        ? this.queryInfo.currentPage--
        : this.queryInfo.currentPage++;
    },
    setUserList() {
      this.filterList = userList.filterItems(
        this.queryInfo.keyword.trim(),
        this.queryInfo.pageSize,
        this.queryInfo.currentPage
      );
      this.queryInfo.pageNum = userList.pageNum;
      this.setRouter();
    },
    deleteUserList(index, id) {
      userList.deleteItem(id);
      this.filterList.splice(index, 1);
    },
    showEditDialog(item) {
      this.editInfo = { tempItem: item, newName: item.name };
      this.isShowEdit = true;
    },
    cancelEditDialog() {
      this.editInfo.name = "";
      this.isShowEdit = false;
    },
    closeEditDialog() {
      this.isShowEdit = false;
    },
    editUserList() {
      const { tempItem, newName } = this.editInfo;
      userList.editItem(tempItem.id, newName);
      this.editInfo.tempItem.name = newName;
    },
    setRouter() {
      this.$router.push({
        query: {
          currentPage: this.queryInfo.currentPage,
          keyword: this.queryInfo.keyword.trim(),
        },
      });
    },
  },
};
</script>

<style>
.listTable {
  margin: 20px 0;
}

table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  text-align: center;
  width: 100%;
}
table th,
table td {
  border: 1px solid #ccc;
  padding: 5px;
}

.listPage {
  width: 80%;
  margin: 0 auto;
  position: relative;
}

.listPage-search {
  float: right;
}

.listPagination {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.listEdit {
  position: absolute;
  left: 30%;
  top: 100px;
  margin: auto;
  width: 400px;
  background-color: white;
  border: 1px solid rgb(58, 191, 252);
  border-radius: 20px;
  padding: 30px;
}

.listEdit-input {
  width: 300px !important;
  padding: 5px 0;
  margin: 10px 0;
}

.listEdit-buttons {
  display: flex;
  justify-content: end;
}

.listEdit-buttons button {
  margin: 5px;
}
</style>