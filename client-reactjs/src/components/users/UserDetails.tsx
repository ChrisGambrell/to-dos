import TimeAgo from 'react-time-ago'
import { useUserTodos } from '../../hooks/todos'
import { Todo, User } from '../../models'
import { View } from '../../components'

const UserDetails = ({ user }: { user: User }) => {
	const { data: todos = [] } = useUserTodos(user.id, Boolean(user)) as unknown as { data: [Todo] }

	return user ? (
		<>
			<View.Header>
				<div className='flex items-center space-x-2'>
					<img className='flex-none w-12 h-12 rounded-full' src={user.photo_url} alt='profile' title={user.name} />
					<div className='flex-grow truncate'>{user.name}</div>
				</div>
			</View.Header>
			<View.Content>
				<div className='flex flex-col'>
					<div>
						<b>Email:</b> {user.email}
					</div>
					<div>
						<b>Created:</b> <TimeAgo date={user.created_at} />
					</div>
					<div>
						<b>Updated:</b> <TimeAgo date={user.updated_at} />
					</div>
					{todos.length > 0 && (
						<div className='mt-2'>
							<b>To-Dos</b>
							{todos.map((todo) => (
								<div className='text-sm italic'>{todo.body}</div>
							))}
						</div>
					)}
				</div>
			</View.Content>
		</>
	) : (
		<div>Loading user...</div>
	)
}

export default UserDetails
