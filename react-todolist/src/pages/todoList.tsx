import React, { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import styles from './todoList.less';

interface TodoItem {
  id: string,
  content: string,
  isCompleted: boolean
}

const todoStore = {
  todoStoreKey: 'todoList',
  get():TodoItem[] {
    const list = window.localStorage.getItem(this.todoStoreKey);
    if (list) {
      try {
        return JSON.parse(list);
      } catch (error) {
        console.error('error', error);
      }
    }
    return [];
  },
  save(todoList: TodoItem[]) {
    try {
      window.localStorage.setItem(this.todoStoreKey, JSON.stringify(todoList));
    } catch (err) {
      console.error(err);
    }
  },
};

const TodoListPage: React.FC = () => {
  const addInputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const [curIndex, setCurIndex] = useState<number>(-1);
  const [editInputValue, setEditInputValue] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isAllCompleted, setIsAllCompleted] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<TodoItem[]>(todoStore.get());
  const [filterList, setFilterList] = useState<TodoItem[]>(todoList);

  function handleAdd(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      if (addInputRef.current) {
        const newTodo = {
          id: nanoid(),
          content: addInputRef.current.value.trim(),
          isCompleted: false,
        };
        setTodoList([...todoList, newTodo]);
        addInputRef.current.value = '';
      }
    }
  }

  function handleDelete(id: string) {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  }

  function handleChange(index: number) {
    todoList[index].isCompleted = !todoList[index].isCompleted;
    setTodoList([...todoList]);
  }

  function handleEdit(item:TodoItem, index: number) {
    setCurIndex(index);
    setEditInputValue(item.content);
  }

  function saveEdit(type: string, index: number, event: any) {
    if (type === 'keyDown' && event.key !== 'Enter') return;
    todoList[index].content = event.target.value;
    setTodoList([...todoList]);
    setCurIndex(-1);
  }

  function handleClear() {
    const newTodoList = todoList.filter((item) => item.isCompleted === false);
    setTodoList(newTodoList);
  }

  function handleAllToggle() {
    setIsAllCompleted(!isAllCompleted);
    const newTodoList = todoList.map((item) => ({
      ...item,
      isCompleted: !isAllCompleted,
    }));
    setTodoList(newTodoList);
  }

  function checkAllToggle():boolean {
    let show = true;
    todoList.forEach((item) => {
      if (!item.isCompleted) {
        show = false;
      }
    });
    return show;
  }

  function checkIsShow() {
    const show = todoList.filter((item) => item.isCompleted === true).length > 0;
    setIsShow(show);
  }

  useEffect(() => {
    todoStore.save(todoList);
    checkIsShow();
    setIsAllCompleted(checkAllToggle());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoList]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [curIndex]);

  useEffect(() => {
    if (filterType === 'active') {
      setFilterList(todoList.filter((item) => item.isCompleted === false));
    } else if (filterType === 'completed') {
      setFilterList(todoList.filter((item) => item.isCompleted === true));
    } else {
      setFilterList(todoList);
    }
  }, [filterType, todoList]);

  return (
    <>
      <div className={styles.header}>
        <input type="checkbox" onChange={handleAllToggle} checked={isAllCompleted} />
        <input
          ref={addInputRef}
          type="text"
          onKeyDown={handleAdd}
          placeholder="What needs to be done?"
        />
      </div>
      {
        todoList.length && (
          <>
            <div className={styles.main}>
              <ul>
                {
                  filterList.map((todo:TodoItem, index:number) => (
                    <li key={todo.id}>
                      <input
                        type="checkbox"
                        onChange={() => handleChange(index)}
                        checked={todo.isCompleted}
                      />
                      {
                        curIndex === index ? (
                          <input
                            type="text"
                            value={editInputValue}
                            ref={editInputRef}
                            onChange={(event) => setEditInputValue(event.target.value)}
                            onBlur={(event) => saveEdit('blur', index, event)}
                            onKeyDown={(event) => saveEdit('keyDown', index, event)}
                          />
                        ) : (
                          <span onDoubleClick={() => handleEdit(todo, index)}>{todo.content}</span>
                        )
                      }
                      <button type="button" onClick={() => handleDelete(todo.id)}>X</button>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className={styles.footer}>
              <div>
                <i>{todoList.length}</i>
                <span> items left</span>
              </div>
              <button type="button" onClick={() => setFilterType('all')}>All</button>
              <button type="button" onClick={() => setFilterType('active')}>Active</button>
              <button type="button" onClick={() => setFilterType('completed')}>Completed</button>
              <div>
                {isShow && (
                  <button
                    type="button"
                    onClick={handleClear}
                  >
                    Clear completed
                  </button>
                )}
              </div>
            </div>
          </>
        )
      }
    </>
  );
};

export default TodoListPage;
