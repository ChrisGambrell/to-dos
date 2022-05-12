import { FormEvent, MutableRefObject, useEffect, useRef, useState } from 'react'
import { useCreateTodo, useDeleteTodo, useEditTodo, useTodos, useDebounce, useOnClickOutside } from './hooks'
import { EditTodoData } from './hooks/useEditTodo'
import TimeAgo from 'react-time-ago'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { Todo } from './models'

function App() {
	const { data: todos = [] } = useTodos.all() as { data: [Todo] }
	const createTodo = useCreateTodo().mutate
	const deleteTodo = useDeleteTodo().mutate
	const editTodo = useEditTodo().mutate

	const activeTodo = useRef<HTMLDivElement>(null)
	const [selectedTodo, setSelectedTodo] = useState(-1)
	const [newTodo, setNewTodo] = useState('')

	const [selectedBody, setSelectedBody] = useState('')
	const debouncedBody = useDebounce(selectedBody, 300)

	useEffect(() => {
		if (selectedTodo !== -1) setSelectedBody(todos.find((todo) => todo.id === selectedTodo)?.body || '')
		else setSelectedBody('')
	}, [selectedTodo])

	useEffect(() => {
		if (debouncedBody !== todos.find((todo) => todo.id === selectedTodo)?.body && debouncedBody.trim() !== '')
			editTodo({ todoId: selectedTodo, data: { body: debouncedBody } })
	}, [debouncedBody])

	useOnClickOutside(activeTodo, () => setSelectedTodo(-1))

	const handleCreateTodo = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		createTodo({ body: newTodo })
		setNewTodo('')
	}

	const handleEditTodo = (todoId: number, data: EditTodoData) => {
		editTodo({ todoId, data })
	}

	const handleDeleteTodo = (todoId: number) => {
		deleteTodo(todoId)
	}

	return (
		<div className='flex justify-center'>
			<div className='flex flex-col w-1/2 m-4 p-4 rounded-lg bg-gray-50'>
				<div className='mb-4 text-4xl font-bold'>To-Dos</div>
				<div className='flex px-1 border-t border-gray-200'>
					<form onSubmit={handleCreateTodo}>
						<input
							className='flex-grow outline-none bg-inherit'
							type='text'
							placeholder='New To-Do'
							value={newTodo}
							onChange={(e) => setNewTodo(e.target.value)}
						/>
					</form>
				</div>
				{todos.map((todo) => (
					<div
						key={todo.id}
						className={`group flex items-center space-x-2 px-1 ${
							selectedTodo === todo.id ? 'border-y-2 border-gray-400' : 'border-t last:border-b border-gray-200'
						} odd:bg-gray-100`}>
						<input
							className='flex-none'
							type='checkbox'
							defaultChecked={todo.completed}
							onChange={() => handleEditTodo(todo.id, { completed: !todo.completed })}
						/>
						{selectedTodo === todo.id ? (
							<input
								className='flex-grow outline-none bg-inherit'
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
		</div>
	)
}

export default App
