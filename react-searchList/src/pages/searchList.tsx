import React, { useState, useRef, useEffect } from 'react';
import styles from './searchList.less';

interface User {
  id: number,
  name: string,
  profession: string,
  isSelected: boolean
}

interface QueryInfo {
  pageSize: number,
  currentPage: number,
  pageNum: number,
  total: number,
}

interface FilterUsers {
  usersList: User[],
  pageBean: QueryInfo
}

interface UserList {
  users: User[],
  deleteUser: (id: number)=>void,
  editUser: (id: number, newName: string)=>void,
  filterUsers: (keyword:string, queryInfo?:QueryInfo)=>FilterUsers
}

const UserListHandler: UserList = {
  users: new Array(11).fill(0).map((item, index) => ({
    id: index + 1, name: `张${index}`, profession: '特务', isSelected: false,
  })),
  deleteUser(id) {
    this.users = this.users.filter((item) => item.id !== id);
  },
  editUser(id, newName) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index].name = newName;
  },
  filterUsers(keyword, queryInfo = {
    pageSize: 3, currentPage: 1, pageNum: 1, total: 1,
  }) {
    const { pageSize, currentPage } = queryInfo;
    const pageBean:QueryInfo = { ...queryInfo };
    const key = keyword && keyword.toLowerCase();
    const rlt = this.users.filter((item) => item.name.toLocaleLowerCase().includes(key));
    pageBean.pageNum = Math.ceil(rlt.length / pageSize);
    pageBean.total = rlt.length;
    return {
      usersList: rlt.slice(pageSize * (currentPage - 1), pageSize * currentPage),
      pageBean,
    };
  },
};

const SearchListPage: React.FC = () => {
  const [queryInfo, setQueryInfo] = useState<QueryInfo>(UserListHandler.filterUsers('').pageBean);
  const [tableList, setTableList] = useState<User[]>(UserListHandler.filterUsers('', queryInfo).usersList);
  const [isModelVisible, setIsModelVisible] = useState<boolean>(false);
  const initialModel:User = {
    id: 0, name: '', profession: '', isSelected: false,
  };
  const [editUserInfo, setEditUserInfo] = useState<User>(initialModel);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const editInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const turnPageInputRef = useRef<HTMLInputElement>(null);

  function handleSearch() {
    if (searchInputRef.current) {
      const {
        usersList, pageBean,
      } = UserListHandler.filterUsers(searchInputRef.current.value, queryInfo);
      setTableList(usersList);
      setQueryInfo(pageBean);
    }
  }

  function showEditModel(item: User) {
    setIsModelVisible(true);
    setEditUserInfo(item);
  }

  function handleCancelEdit() {
    setIsModelVisible(false);
  }

  function handleEdit() {
    if (editInputRef.current) {
      UserListHandler.editUser(editUserInfo.id, editInputRef.current.value);
    }
    setIsModelVisible(false);
    setEditUserInfo(initialModel);
  }

  function handleDelete(id: number) {
    setTableList(tableList.filter((item) => item.id !== id));
    UserListHandler.deleteUser(id);
  }

  function checkAllToggle() {
    setIsAllSelected(tableList.every((item) => item.isSelected === true));
  }

  function handleAllToggle() {
    setIsAllSelected(!isAllSelected);
    setTableList(tableList.map((item) => ({
      ...item,
      isSelected: !isAllSelected,
    })));
  }

  function handleToggle(index: number) {
    tableList[index].isSelected = !tableList[index].isSelected;
    setTableList([...tableList]);
  }

  function handleTurnPage(page = 0) {
    let pageNum = page;
    if (!pageNum && turnPageInputRef.current) {
      pageNum = parseInt(turnPageInputRef.current.value.trim(), 10);
      turnPageInputRef.current.value = '';
    }
    if (pageNum >= 1 && pageNum <= queryInfo.pageNum) {
      setQueryInfo(Object.assign(queryInfo, { currentPage: pageNum }));
    }
    handleSearch();
  }

  useEffect(() => {
    checkAllToggle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableList]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editUserInfo]);

  return (
    <div className={styles.searchList}>
      <div className={styles.searchBox}>
        <input type="text" placeholder="搜索" ref={searchInputRef} />
        <button type="button" onClick={handleSearch} className={styles.searchButton}>搜索</button>
      </div>
      <table className={styles.searchTable}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={isAllSelected} onChange={() => handleAllToggle()} />
            </th>
            <th>Index</th>
            <th>ID</th>
            <th>Name</th>
            <th>Profession</th>
          </tr>
        </thead>
        <tbody>
          {
            tableList.map((item: User, index: number) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleToggle(index)}
                    checked={item.isSelected}
                  />
                </td>
                <td>{index}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.profession}</td>
                <td>
                  <button type="button" onClick={() => showEditModel(item)} className={styles.operateButton}>编辑</button>
                  <button type="button" onClick={() => handleDelete(item.id)} className={styles.operateButton}>删除</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className={styles.pagination}>
        <div className={styles.paginationLeft}>
          共
          {' '}
          <strong>{queryInfo.total}</strong>
          {' '}
          条
        </div>
        <div className={styles.paginationRight}>
          <button type="button" onClick={() => (handleTurnPage(queryInfo.currentPage - 1))} className={styles.paginationButton}>pre</button>
          <span>
            {queryInfo.currentPage}
            {' '}
            /
            {' '}
            {queryInfo.pageNum}
          </span>
          <button type="button" onClick={() => handleTurnPage(queryInfo.currentPage + 1)} className={styles.paginationButton}>next</button>
          <input type="text" ref={turnPageInputRef} />
          <button type="button" onClick={() => { handleTurnPage(); }} className={styles.paginationButton}>Go</button>
        </div>
      </div>
      {
        isModelVisible && (
          <div className={styles.editModel}>
            <div>更改名字为：</div>
            <div>
              <input
                type="text"
                className={styles.editModelInput}
                defaultValue={editUserInfo.name}
                ref={editInputRef}
              />
            </div>
            <div className={styles.editModelButtons}>
              <button type="button" onClick={handleCancelEdit} className={styles.editModelButton}>取消</button>
              <button type="button" onClick={handleEdit} className={styles.editModelButton}>确定</button>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default SearchListPage;
