import TimeAgo from 'react-time-ago'
import { User } from '../../models'
import { View } from '../../components'

const UserDetails = ({ user }: { user: User }) => {
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
				</div>
			</View.Content>
		</>
	) : (
		<div>Loading user...</div>
	)
}

export default UserDetails
