import React, { useState } from 'react'
import styled from 'styled-components'

import TodoList from './TodoList'

export default function TodoApp() {
  const [items, setItems] = useState([])
  const [text, setText] = useState('')
  const [selectedItems, setSelectedItems] = useState([])

  const handleAddItem = (event) => {
    event.preventDefault()
    var newItem = {
      id: Date.now(),
      text: text,
      done: false,
    }
    const newOrder = [newItem].concat(items)
    setItems(newOrder)
    setText('')
  }

  const markItemCompleted = (itemId) => {
    var updatedItems = items.map((item) => {
      if (itemId === item.id) item.done = !item.done

      return item
    })
    // State Updates are Merged
    setItems([].concat(updatedItems))
    setSelectedItems(updatedItems.filter((item) => item.done === true))
  }

  const handleDeleteItem = (itemId) => {
    var updatedItems = items.filter((item) => {
      return item.id !== itemId
    })

    setItems([].concat(updatedItems))
  }

  const DeleteSelectedItems = () => {
    const difference = items.filter(
      (task) => !selectedItems.filter((selected) => selected.id === task.id).length,
    )
    setItems([].concat(difference))
  }

  return (
    <AppWrapper>
      <AppContainer>
        <AppTitle className="apptitle">World's Best Todo App 🎉</AppTitle>

        <form>
          <FormWrapper>
            <InputIconWrapper>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none">
                <path
                  d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2ZM16 12.75h-3.25V16c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-3.25H8c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.25V8c0-.41.34-.75.75-.75s.75.34.75.75v3.25H16c.41 0 .75.34.75.75s-.34.75-.75.75Z"
                  fill="#fb77a0"></path>
              </svg>
            </InputIconWrapper>

            <Input
              type="text"
              placeholder="Add a task"
              onChange={(e) => {
                setText(e.target.value)
              }}
              value={text}
            />

            <Button onClick={handleAddItem} disabled={!text}>
              {'Add #' + (items.length + 1)}
            </Button>
          </FormWrapper>
        </form>

        <div className="col-md-3">
          <TodoList
            items={items}
            onItemCompleted={markItemCompleted}
            onDeleteItem={handleDeleteItem}
            onDeleteSelected={DeleteSelectedItems}
            selectedItems={selectedItems}
          />
        </div>
      </AppContainer>
    </AppWrapper>
  )
}

const AppWrapper = styled.div`
  height: 100vh;
  padding-top: 60px;

  @media (max-width: 576px) {
    padding-top: 30px;
  }
`

const AppTitle = styled.h3`
  font-size: 1.5em;
  text-align: center;
  color: pink;
  margin-bottom: 10px;
`

const AppContainer = styled.div`
  max-width: 800px;
  padding: 20px;
  margin: 0 auto;
`

const Input = styled.input`
  font-size: 1rem;
  padding: 1rem;
  margin: 10px;
  background: transparent;
  border: 0.5px solid #cacacc;
  border-radius: 12px;
  outline: none;
  color: pink;
  width: 80%;
  text-indent: 30px;

  ::focus {
    outline: none;
  }
`

const InputIconWrapper = styled.div`
  position: relative;
  svg {
    position: absolute;
    left: 25px;
    top: -14px;
  }
`

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
`

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  padding: 16px 35px;
  border: 2px solid palevioletred;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
`
