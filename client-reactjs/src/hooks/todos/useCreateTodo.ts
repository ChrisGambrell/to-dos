import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../../app/utils'
import { Todo } from '../../models'

interface CreateTodoData {
	body: string
	completed?: boolean
}

const useCreateTodo = () => {
	const queryClient = useQueryClient()

	return useMutation((data: CreateTodoData) => axios.post(BASE_URL + '/todos/', data).then((res) => res.data), {
		onSuccess: (todo: Todo) => {
			if (!queryClient.getQueryData('todos')) queryClient.setQueryData('todos', [todo])
			else queryClient.setQueryData('todos', (old: any) => [...old, todo])
		},
	})
}

export default useCreateTodo
