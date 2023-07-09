class UserListHandler {
  constructor(list) {
    this.list = list;
  }

  deleteItem(id) {
    let index = this.list.findIndex((item) => item.id == id);
    this.list[index].isDeleted = true;
  }

  filterItems(keywords, pageSize, currPage) {
    if (keywords) keywords = keywords && keywords.toLowerCase();
    let rlt = this.list.filter(item => item.name.toLocaleLowerCase().includes(keywords))
    this.pageNum = Math.ceil(rlt.length / pageSize)
    return rlt.slice(pageSize * (currPage - 1), pageSize * currPage).filter((item) => {
      return item.isDeleted === false;
    });
  }

  editItem(id, newname) {
    let index = this.list.findIndex((item) => item.id == id);
    this.list[index].name = newname.trim();
  }
};

const users = new Array(11).fill().map((item, index) => {
  return { id: index + 1, name: '张' + index, profession: "特务", isDeleted: false };
});

const userList = new UserListHandler(users);

export {
  userList
};
