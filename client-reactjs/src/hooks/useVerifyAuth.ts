import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useVerifyAuth = () => {
	const navigate = useNavigate()

	return useQuery('auth', () => axios.get(BASE_URL + '/auth/verify'), {
		retry: false,
		onError: () => {
			window.localStorage.removeItem('authToken')
			navigate('/login')
		},
	})
}

export default useVerifyAuth
