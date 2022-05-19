import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useVerifyAuth = () => {
	const navigate = useNavigate()

	const token = window.localStorage.getItem('authToken') || ''
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

	return useQuery('auth', () => axios.get(BASE_URL + '/auth/verify'), {
		retry: false,
		onError: () => {
			window.localStorage.removeItem('authToken')
			navigate('/login')
		},
	})
}

export default useVerifyAuth
