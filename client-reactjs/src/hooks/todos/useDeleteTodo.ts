import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../../app/utils'
import { Todo } from '../../models'

const useDeleteTodo = () => {
	const queryClient = useQueryClient()

	return useMutation((todoId: number) => axios.delete(BASE_URL + `/todos/${todoId}`), {
		onSuccess: (_, todoId) => {
			queryClient.setQueryData('todos', (old: any) => old.filter((t: Todo) => t.id !== todoId))
		},
	})
}

export default useDeleteTodo
