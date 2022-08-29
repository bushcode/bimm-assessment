import React from 'react'
import TodoItem from './TodoItem'
import styled from 'styled-components'

function TodoList({ items, onItemCompleted, onDeleteItem, onDeleteSelected, selectedItems }) {
  return (
    <TaskList className="todolist">
      {items.length > 0 && (
        <TaskUtil>
          <h3>Tasks - {items.length}</h3>
          {selectedItems.length > 1 && (
            <DeleteSelected onClick={() => onDeleteSelected()}>
              Delete Selected Tasks
            </DeleteSelected>
          )}
        </TaskUtil>
      )}

      {items.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          text={item.text}
          completed={item.done}
          onItemCompleted={onItemCompleted}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </TaskList>
  )
}

export default TodoList

const TaskList = styled.ul`
  list-style-type: none;
  padding: 10px;
  margin-top: 15px;

  h3 {
    color: #cfced3;
    font-size: 1.25rem;
  }
`

const TaskUtil = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const DeleteSelected = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  border: 2px solid #fb77a0;
  padding: 10px 15px;
  white-space: nowrap;
  vertical-align: middle;
  color: palevioletred;
  text-align: center;
`
