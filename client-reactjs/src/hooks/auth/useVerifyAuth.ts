import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../../app/utils'
import { User } from '../../models'

const useVerifyAuth = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const token = window.localStorage.getItem('authToken') || ''
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

	return useQuery('auth', () => axios.get(BASE_URL + '/auth/verify').then((res) => res.data), {
		retry: false,
		onSuccess: (user: User) => {
			if (!queryClient.getQueryData('users')) queryClient.setQueryData('users', [user])
		},
		onError: () => {
			window.localStorage.removeItem('authToken')
			navigate('/login')
		},
	})
}

export default useVerifyAuth
