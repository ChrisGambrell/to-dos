import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import TimeAgo from 'react-time-ago'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { useDebounce, useOnClickOutsideTodo, useDeleteTodo, useUser } from '../hooks'
import useEditTodo, { EditTodoData } from '../hooks/useEditTodo'
import { Todo, User } from '../models'

const TodoItem = ({ todo, selected, setSelected }: { todo: Todo; selected: boolean; setSelected: Dispatch<SetStateAction<number>> }) => {
	const { data: user } = useUser(todo.user_id) as { data: User }

	const deleteTodo = useDeleteTodo().mutate
	const editTodo = useEditTodo().mutate

	const [selectedBody, setSelectedBody] = useState('')
	const debouncedBody = useDebounce(selectedBody, 300)

	useEffect(() => {
		if (selected) setSelectedBody(todo.body)
		else setSelectedBody('')
		// due to not wanting to change body's value...
		// eslint-disable-next-line
	}, [selected])

	useEffect(() => {
		if (debouncedBody !== todo.body && debouncedBody.trim() !== '') editTodo({ todoId: todo.id, data: { body: debouncedBody } })
		// due to not wanting to change debounced value...
		// eslint-disable-next-line
	}, [debouncedBody])

	const activeTodo = useRef<HTMLDivElement>(null)
	useOnClickOutsideTodo(activeTodo, () => setSelected(-1))

	const handleEditTodo = (todoId: number, data: EditTodoData) => {
		editTodo({ todoId, data })
	}

	const handleDeleteTodo = (todoId: number) => {
		deleteTodo(todoId)
	}

	return user ? (
		<div
			key={todo.id}
			className={`group flex items-center space-x-2 px-1 py-2 ${
				selected ? 'border-x-2 shadow-lg border-gray-400' : 'border-t last:border-b border-gray-200'
			} odd:bg-gray-100 hover:bg-gray-200`}>
			<input
				className='flex-none'
				type='checkbox'
				defaultChecked={todo.completed}
				onChange={() => handleEditTodo(todo.id, { completed: !todo.completed })}
			/>
			{selected ? (
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
				<div className='flex-grow truncate' id='todo-body' ref={selected ? activeTodo : null} onClick={() => setSelected(todo.id)}>
					{todo.body}
				</div>
			)}
			<Icon
				className='flex-none w-0.5 group-hover:w-3 h-0.5 group-hover:h-3 opacity-0 group-hover:opacity-100 text-red-500 active:text-red-600'
				icon='trash'
				onClick={() => handleDeleteTodo(todo.id)}
			/>
			<TimeAgo className='flex-none font-light text-sm text-gray-400' date={todo.created_at} timeStyle='twitter' />
			<img className='flex-none w-7 h-7 rounded-full' src={user.photo_url} title={user.name} />
		</div>
	) : (
		<div>Loading to-do...</div>
	)
}

export default TodoItem
