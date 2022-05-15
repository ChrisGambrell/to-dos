import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { NewTodo, TodoList } from './components'
import { LogIn } from './pages'

function App() {
	const [filter, setFilter] = useState(0)
	const [selectedTodo, setSelectedTodo] = useState(-1)

	const FilterOption = ({ value, label }: { value: number; label: string }) => (
		<div
			className={`cursor-pointer ${
				value === filter ? 'cursor-default text-gray-400' : 'hover:underline text-blue-500 active:text-blue-600'
			}`}
			onClick={() => setFilter(value)}>
			{label}
		</div>
	)

	return (
		<Routes>
			<Route
				path='/'
				element={
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
				}
			/>
			<Route path='/login' element={<LogIn />} />
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	)
}

export default App
