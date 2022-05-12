import { useState } from 'react'
import { NewTodo, TodoList } from './components'

function App() {
	const [filter, setFilter] = useState(0)
	const [selectedTodo, setSelectedTodo] = useState(-1)

	const FilterOption = ({ value, label }: { value: number; label: string }) => (
		<div className='cursor-pointer hover:underline text-blue-500 active:text-blue-600' onClick={() => setFilter(value)}>
			{label}
		</div>
	)

	return (
		<div className='flex justify-center'>
			<div className='flex flex-col w-1/2 m-4 p-4 border border-gray-200 rounded-lg shadow-lg bg-gray-50'>
				<div className='mb-4 text-4xl font-bold'>To-Dos</div>
				<div className='flex justify-end space-x-1'>
					<FilterOption value={0} label='All' />
					<FilterOption value={1} label='Complete' />
					<FilterOption value={2} label='Incomplete' />
				</div>
				<NewTodo filter={filter} setSelectedTodo={setSelectedTodo} />
				<TodoList filter={filter} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
			</div>
		</div>
	)
}

export default App
