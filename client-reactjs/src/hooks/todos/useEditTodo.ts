import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../../app/utils'
import { Todo } from '../../models'

export interface EditTodoData {
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
				if (!queryClient.getQueryData('todos')) queryClient.setQueryData('todos', [todo])
				else queryClient.setQueryData('todos', (old: any) => old.map((t: Todo) => (t.id === todo.id ? todo : t)))
			},
		}
	)
}

export default useEditTodo
