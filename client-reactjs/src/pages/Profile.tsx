import { useVerifyAuth } from '../hooks/auth'
import { User } from '../models'
import { View } from '../components'
import { UserDetails } from '../components/users'

const Profile = () => {
	const { data: user } = useVerifyAuth() as { data: User }

	return (
		<View>
			<UserDetails user={user} />
		</View>
	)
}

export default Profile
