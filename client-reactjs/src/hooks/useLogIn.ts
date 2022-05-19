import { useMutation } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'
import { Token } from '../models'

export interface LogInData {
	email: string
	password: string
}

const useLogIn = () =>
	useMutation(({ data }: { data: LogInData }) => axios.post(BASE_URL + '/auth/login', data).then((res) => res.data), {
		onSuccess: (token: Token) => {
			window.localStorage.setItem('authToken', token.token)
			axios.defaults.headers.common['Authorization'] = `Bearer ${token.token}`
		},
	})

export default useLogIn
