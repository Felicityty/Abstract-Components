<template>
  <div class="todolist">
    <!-- header -->
    <header class="header">
      <span class="title">todos</span>
      <div>
        <input type="checkbox" @click="allDone()" :checked="done"/>
        <input type="text" v-model="inputValue" @keydown.enter="todoAdd" placeholder="What needs to be done?"/>
      </div>
    </header>

    <!-- section -->
    <section class="section" v-show="todoList.length">
      <ul>
        <li v-for="(item, index) in filterList" :key="index">
          <input type="checkbox" :checked="item.done" @click="todoChange(item, index)"/>
          <span
            v-if="index !== currentIndex"
            @dblclick="todoEdit(item, index)"
          >{{ item.title }}</span>
          <input
            type="text"
            v-if="index === currentIndex"
            v-model="item.title"
            @keydown.enter="saveEdit(index)"
            @blur="saveEdit(index)"
            @keydown.esc="cancelEdit(item)"
            v-focus
          />
          <a href="##" @click="todoDelete(index)" class="delete">X</a>
        </li>
      </ul>
    </section>

    <!-- footer -->
    <footer class="footer" v-show="todoList.length">
      <strong>{{ activeNum }}  left</strong>
      <ul class="filters">
        <li>
          <a href="##" @click="todoVisibility('all')" :class="{selected: visibility==='all'}">All</a>
        </li>
        <li>
          <a href="##" @click="todoVisibility('active')" :class="{selected: visibility==='active'}">Active</a>
        </li>
        <li>
          <a href="##" @click="todoVisibility('completed')" :class="{selected: visibility==='completed'}">Completed</a>
        </li>
      </ul>
      <button @click="todoClear" v-show="isShow">Clear completed</button>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
      todoList: [],
      editValue: "",
      currentIndex: -1,
      preValue: "",
      visibility: 'all',
      done: false
    };
  },
  created() {
    let list = window.localStorage.getItem('todoList')
    if (list) {
      try {
        this.todoList = JSON.parse(list)
      } catch(err) {
        console.error(err)
      }
    }
  },
  computed: {
    filterList() {
      if(this.visibility === 'all') {
        return this.todoList
      } else if(this.visibility === 'active') {
        return this.todoList.filter(item => item.done === false)
      } else {
        return this.todoList.filter(item => item.done === true)
      }
    },
    activeNum() {
      let num = 0
      this.todoList.forEach(item => {
        if(!item.done) num++
      })
      if(num>1) return num+' items'
      return num + 'item'
    },
    isShow() {
      let show = false
      this.todoList.forEach(item => {
        if(item.done) {
            show = true
        }
      })
      return show
    }
  },
  watch: {
    todoList: 'todoSave'
  },
  methods: {
    // 保存数据
    todoSave() {
      try {
        window.localStorage.setItem('todoList',JSON.stringify(this.todoList))
      } catch (err) {
        console.error(err)
      }
    },
    // 增加
    todoAdd() {
      let value = this.inputValue && this.inputValue.trim()
      if(!value) return
      this.todoList.push({
        title: value,
        done: false,
      });
      this.inputValue = "";
    },
    // 编辑
    todoEdit(item, index) {
      this.preValue = item.title
      this.currentIndex = index
    },
    // 保存编辑
    saveEdit(index) {
      let value = this.editValue && this.editValue.trim()
      if(!value) this.todoDelete(index)
      this.currentIndex = -1
      this.preValue = ""
    },
    // 放弃编辑
    cancelEdit(item) {
      item.title = this.preValue
      this.currentIndex = -1
      this.preValue = ""
    },
    // 改变是否完成
    todoChange(item, index) {
      item.done = !item.done
    },
    // 删除
    todoDelete(index) {
      this.todoList.splice(index, 1)
    },
    todoVisibility(visible) {
      this.visibility = visible
    },
    // 删除已完成
    todoClear() {
      this.todoList = this.todoList.filter(item => item.done == false)
      this.done = false
    },
    // 全选/全不选
    allDone() {
      this.done = !this.done
      if(this.done) {
        this.todoList.forEach(item => item.done = true)
      } else {
        this.todoList.forEach(item => item.done = false)
      }
    }
  },
  // 自定义指令
  directives: {
    focus: {
      // inserted函数表示当绑定了该指令的元素被插入到dom时候会自动触发
      inserted(el) {
        el.focus()
      }
    }
  }
};
</script>

<style>

* {
    margin: 0;
    padding: 0;
}

li {
    list-style: none;
}

a {
    text-decoration: none;
}

.title {
    font-size: 50px;
    color: pink;
}

.selected {
  border: 1px solid pink;
}

</style>