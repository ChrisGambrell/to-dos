import { useState } from 'react'
import { View } from '../components'
import { NewTodo, TodoList } from '../components/todos'

const Todos = () => {
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
		<View>
			<View.Header>To-Dos</View.Header>
			<View.Content>
				<div className='flex justify-end space-x-1'>
					<FilterOption value={0} label='All' />
					<FilterOption value={1} label='Complete' />
					<FilterOption value={2} label='Incomplete' />
				</div>
				<NewTodo filter={filter} setSelectedTodo={setSelectedTodo} />
				<TodoList filter={filter} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
			</View.Content>
		</View>
	)
}

export default Todos
