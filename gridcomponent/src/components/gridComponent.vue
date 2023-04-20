<template>
  <div>
    <!-- search -->
    <div>
      <span>search</span>
      <input type="text" v-model="keyword">
    </div>
    <!-- table -->
    <div class="gridTable">
      <table>
        <!-- table-head -->
        <thead>
          <tr>
            <th
              v-for="(item, index) in gridTitle"
              :key="index" @click="changeOrder(index)"
              class="gridTable-thead"
              :class="{on: currentIndex===index}"
            >
              {{ item.title }}
              <a href="##" 
                :class="item.order ? 'gridTable-arrow-bottom':'gridTable-arrow-top'"
              ></a>
            </th>
          </tr>
        </thead>
        <!-- table-body -->
        <tbody>
          <tr v-for="user in changeInfo" :key="user.name">
            <td>{{ user.name }}</td>
            <td>{{ user.power }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      gridTitle: [
        { title: 'name', order: 0, show: 0},
        { title: 'power', order: 0, show:0}
      ],
      currentIndex: -1,
      userInfo: [
        { name: "Chuck Norris", power: Infinity },
        { name: "Bruce Lee", power: 9000 },
        { name: "Jackie Chan", power: 7000 },
        { name: "Jet Li", power: 8000 }
      ],
    }
  },
  computed: {
    // 模糊搜索
    changeInfo() {
      if(this.keyword === '') return this.userInfo
      return this.userInfo.filter(user => {
        for(let i in user) {
          if(user[i].toString().toLowerCase().includes(this.keyword.toLowerCase())) {
            return true
          }
        }
      })
    }
  },
  methods: {
    // 排序
    changeOrder(index) {
      this.currentIndex = index
      this.gridTitle[index].order = this.gridTitle[index].order === 0 ? 1 : 0

      function compare(prop) {
        return (alert1, alert2) => alert1[prop] > alert2[prop] ? 1 : -1
      }

      if(this.gridTitle[index].order) {
        this.userInfo.sort(compare(this.gridTitle[index].title))
      } else {
        this.userInfo.sort(compare(this.gridTitle[index].title)).reverse()
      }
    }
  }
}
</script>

<style>

.gridTable-thead {
  color: rgb(188, 188, 188);
}
.gridTable-arrow-top {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-top-color: rgb(86, 86, 86);
}

.gridTable-arrow-bottom {
  display: inline-block;
  vertical-align: top;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-bottom-color: rgb(86, 86, 86);
}

.on {
  color: black;
}

</style>