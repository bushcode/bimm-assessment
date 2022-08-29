import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const ListItem = styled.li`
  background-color: #21212b;
  padding: 15px 25px;
  border-radius: 12px;
  color: #bbbbbd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block: 10px;
`

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const TaskDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

function TodoItem({ id, text, onItemCompleted, completed, onDeleteItem }) {
  let _listItem = useRef(null)

  const markCompleted = () => {
    onItemCompleted(id)
  }

  const deleteItem = () => {
    onDeleteItem(id)
  }

  useEffect(() => {
    // Highlight newly added item for several seconds.
    if (_listItem) {
      // 1. Add highlight class.
      _listItem.classList.add('highlight')

      // 2. Set timeout.
      setTimeout(
        (listItem) => {
          // 3. Remove highlight class.
          listItem.classList.remove('highlight')
        },
        500,
        _listItem,
      )
    }
  }, [_listItem])

  var itemClass = 'form-check todoitem ' + (completed ? 'done' : 'undone')

  return (
    <ListItem className={itemClass} ref={(li) => (_listItem = li)}>
      <TaskDetail>
        <label className="form-check-label">
          <input type="checkbox" className="form-check-input" onChange={() => markCompleted()} />{' '}
          <span>{text}</span>
        </label>

        {!completed ? (
          <small className="undone">Task not completed</small>
        ) : (
          <small className="done">🙌🏾 Task Completed</small>
        )}
      </TaskDetail>
      <DeleteButton type="button" onClick={() => deleteItem()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82ZM19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Zm-5.57 9.61h-3.33c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.33c.41 0 .75.34.75.75s-.34.75-.75.75Zm.84-4h-5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5c.41 0 .75.34.75.75s-.34.75-.75.75Z"
            fill="#fb77a0"></path>
        </svg>
      </DeleteButton>
    </ListItem>
  )
}

export default TodoItem
