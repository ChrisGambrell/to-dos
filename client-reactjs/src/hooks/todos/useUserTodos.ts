import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../../app/utils'
import { Todo } from '../../models'

const useUserTodos = (userId: number, enabled: boolean = true) => {
	const queryClient = useQueryClient()

	return useQuery('todos', () => axios.get(BASE_URL + `/users/${userId}/todos`).then((res) => res.data), {
		enabled,
		select: (data: [Todo]) =>
			data
				.map((todo) => ({ ...todo, created_at: new Date(todo.created_at), updated_at: new Date(todo.created_at) }))
				.sort((a: any, b: any) => a.created_at - b.created_at),
		onSuccess: (todos = []) => {
			todos.map((todo: Todo) => queryClient.setQueryData(['todos', todo.id], todo))
		},
	})
}

export default useUserTodos
