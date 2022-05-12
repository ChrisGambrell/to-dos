import { FormEvent, useState } from 'react'
import { useCreateTodo } from './hooks'
import { TodoList } from './components'

function App() {
	const createTodo = useCreateTodo().mutate

	const [selectedTodo, setSelectedTodo] = useState(-1)
	const [newTodo, setNewTodo] = useState('')

	const handleCreateTodo = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		createTodo({ body: newTodo })
		setNewTodo('')
	}

	return (
		<div className='flex justify-center'>
			<div className='flex flex-col w-1/2 m-4 p-4 border border-gray-200 rounded-lg shadow-lg bg-gray-50'>
				<div className='mb-4 text-4xl font-bold'>To-Dos</div>
				<div className='flex px-1 py-2 border-t border-gray-200'>
					<form className='flex-grow' onSubmit={handleCreateTodo}>
						<input
							className='w-full outline-none bg-inherit'
							type='text'
							placeholder='New To-Do'
							value={newTodo}
							onClick={() => setSelectedTodo(-1)}
							onChange={(e) => setNewTodo(e.target.value)}
						/>
					</form>
				</div>
				<TodoList selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
			</div>
		</div>
	)
}

export default App
