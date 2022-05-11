import { useTodos } from './hooks'
import { Todo } from './models'

function App() {
	const { data: todos = [] } = useTodos.all() as { data: [Todo] }

	return (
		<div className='flex justify-center'>
			<div className='flex flex-col w-1/2 m-4 p-4 rounded-lg bg-gray-50'>
				<div className='mb-4 text-4xl font-bold'>To-Dos</div>
				{todos.map((todo) => (
					<div key={todo.id} className='flex items-center space-x-2 px-1 border-t last:border-b border-gray-200 odd:bg-gray-100'>
						<input className='flex-none' type='checkbox' defaultChecked={todo.completed} />
						<div className='flex-grow truncate'>{todo.body}</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default App
