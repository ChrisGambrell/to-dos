import React, { Dispatch, SetStateAction, Suspense } from 'react'
import { useTodos } from '../hooks'
import { Todo } from '../models'
import { TodoItem } from '.'

const TodoList = ({
	filter,
	selectedTodo,
	setSelectedTodo,
}: {
	filter: number
	selectedTodo: number
	setSelectedTodo: Dispatch<SetStateAction<number>>
}) => {
	const { data: todos = [] } = (filter === 0 ? useTodos.all() : filter === 1 ? useTodos.complete() : useTodos.incomplete()) as {
		data: [Todo]
	}

	return (
		<div>
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} selected={selectedTodo === todo.id} setSelected={setSelectedTodo} />
			))}
		</div>
	)
}

export default TodoList
