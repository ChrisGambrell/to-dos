import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'
import { Token } from '../models'

export interface LogInData {
	email: string
	password: string
}

const useLogIn = () => {
	const queryClient = useQueryClient()

	return useMutation(({ data }: { data: LogInData }) => axios.post(BASE_URL + '/auth/login', data).then((res) => res.data), {
		onSuccess: (token: Token) => {
			window.localStorage.setItem('authToken', token.token)

			// queryClient.setQueryData(['todos', todo.id], todo)
			// if (queryClient.getQueryData('todos'))
			// 	queryClient.setQueryData('todos', (old: any) => old.map((t: Todo) => (t.id === todo.id ? todo : t)))
			// else queryClient.setQueryData('todos', [todo])
		},
	})
}

export default useLogIn
