import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { useCreateTodo } from '../hooks/todos'

const NewTodo = ({ filter, setSelectedTodo }: { filter: number; setSelectedTodo: Dispatch<SetStateAction<number>> }) => {
	const createTodo = useCreateTodo().mutate

	const [newTodo, setNewTodo] = useState('')

	const handleCreateTodo = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		createTodo({ body: newTodo, completed: filter === 1 })
		setNewTodo('')
	}

	return (
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
	)
}

export default NewTodo
