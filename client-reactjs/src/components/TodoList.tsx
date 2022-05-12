import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import TimeAgo from 'react-time-ago'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { useDeleteTodo, useEditTodo, useTodos, useDebounce, useOnClickOutsideTodo } from '../hooks'
import { EditTodoData } from '../hooks/useEditTodo'
import { Todo } from '../models'

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
	const deleteTodo = useDeleteTodo().mutate
	const editTodo = useEditTodo().mutate

	const activeTodo = useRef<HTMLDivElement>(null)

	const [selectedBody, setSelectedBody] = useState('')
	const debouncedBody = useDebounce(selectedBody, 300)

	useEffect(() => {
		if (selectedTodo !== -1) setSelectedBody(todos.find((todo) => todo.id === selectedTodo)?.body || '')
		else setSelectedBody('')
		// due to not wanting to change body's value...
		// eslint-disable-next-line
	}, [selectedTodo])

	useEffect(() => {
		if (debouncedBody !== todos.find((todo) => todo.id === selectedTodo)?.body && debouncedBody.trim() !== '')
			editTodo({ todoId: selectedTodo, data: { body: debouncedBody } })
		// due to not wanting to change debounced value...
		// eslint-disable-next-line
	}, [debouncedBody])

	useOnClickOutsideTodo(activeTodo, () => setSelectedTodo(-1))

	const handleEditTodo = (todoId: number, data: EditTodoData) => {
		editTodo({ todoId, data })
	}

	const handleDeleteTodo = (todoId: number) => {
		deleteTodo(todoId)
	}

	return (
		<div>
			{todos.map((todo) => (
				<div
					key={todo.id}
					className={`group flex items-center space-x-2 px-1 py-2 ${
						selectedTodo === todo.id ? 'border-x-2 shadow-lg border-gray-400' : 'border-t last:border-b border-gray-200'
					} odd:bg-gray-100 hover:bg-gray-200`}>
					<input
						className='flex-none'
						type='checkbox'
						defaultChecked={todo.completed}
						onChange={() => handleEditTodo(todo.id, { completed: !todo.completed })}
					/>
					{selectedTodo === todo.id ? (
						<input
							className='flex-grow outline-none bg-inherit'
							id='todo-body'
							type='text'
							placeholder='New To-Do'
							value={selectedBody}
							onChange={(e) => setSelectedBody(e.target.value)}
							autoFocus
						/>
					) : (
						<div
							className='flex-grow truncate'
							id='todo-body'
							ref={selectedTodo === todo.id ? activeTodo : null}
							onClick={() => setSelectedTodo(todo.id)}>
							{todo.body}
						</div>
					)}
					<Icon
						className='flex-none w-0 group-hover:w-3 h-0 group-hover:h-3 opacity-0 group-hover:opacity-100 text-red-500 active:text-red-600'
						icon='trash'
						onClick={() => handleDeleteTodo(todo.id)}
					/>
					<TimeAgo className='font-light text-sm text-gray-400' date={todo.created_at} timeStyle='twitter' />
				</div>
			))}
		</div>
	)
}

export default TodoList
