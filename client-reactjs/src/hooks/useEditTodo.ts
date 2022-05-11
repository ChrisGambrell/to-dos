import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'
import { Todo } from '../models'

interface EditTodoData {
	body?: string
	completed?: boolean
}

const useEditTodo = () => {
	const queryClient = useQueryClient()

	return useMutation(
		({ todoId, data }: { todoId: number; data: EditTodoData }) =>
			axios.patch(BASE_URL + `/todos/${todoId}`, data).then((res) => res.data),
		{
			onSuccess: (todo: Todo) => {
				queryClient.setQueryData(['todos', todo.id], todo)
				if (queryClient.getQueryData('todos'))
					queryClient.setQueryData('todos', (old: any) => old.map((t: Todo) => (t.id === todo.id ? todo : t)))
				else queryClient.setQueryData('todos', [todo])
			},
		}
	)
}

export default useEditTodo
