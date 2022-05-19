import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'
import { User } from '../models'

const useUser = (userId: number) => {
	const queryClient = useQueryClient()

	return useQuery(['users', userId], () => axios.get(BASE_URL + `/users/${userId}`).then((res) => res.data), {
		select: (data: User) => ({ ...data, created_at: new Date(data.created_at), updated_at: new Date(data.updated_at) }),
		onSuccess: (user) => {
			if (!queryClient.getQueryData('users')) queryClient.setQueryData('users', [user])
		},
	})
}

export default useUser
