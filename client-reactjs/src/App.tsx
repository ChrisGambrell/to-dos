import { FormEvent, useState } from 'react'
import { useCreateTodo, useDeleteTodo, useEditTodo, useTodos } from './hooks'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { Todo } from './models'

function App() {
	const { data: todos = [] } = useTodos.all() as { data: [Todo] }
	const createTodo = useCreateTodo().mutate
	const deleteTodo = useDeleteTodo().mutate
	const editTodo = useEditTodo().mutate

	const [newTodo, setNewTodo] = useState('')

	const handleCreateTodo = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		createTodo({ body: newTodo })
		setNewTodo('')
	}

	const handleToggleTodo = (todoId: number) => {
		const todo = todos.find((todo) => todo.id === todoId)
		if (!todo) return

		editTodo({ todoId, data: { completed: !todo.completed } })
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
						className='group flex items-center space-x-2 px-1 border-t last:border-b border-gray-200 odd:bg-gray-100'>
						<input
							className='flex-none'
							type='checkbox'
							defaultChecked={todo.completed}
							onChange={() => handleToggleTodo(todo.id)}
						/>
						<div className='flex-grow truncate'>{todo.body}</div>
						<Icon
							className='flex-none w-0 group-hover:w-3 h-0 group-hover:h-3 opacity-0 group-hover:opacity-100 text-red-500 active:text-red-600'
							icon='trash'
							onClick={() => handleDeleteTodo(todo.id)}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default App
