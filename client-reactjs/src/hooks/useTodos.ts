import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'
import { Todo } from '../models'

const useTodosQuery = (select: any) => {
	const queryClient = useQueryClient()

	return useQuery('todos', () => axios.get(BASE_URL + '/todos/').then((res) => res.data), {
		select,
		onSuccess: (todos = []) => {
			todos.map((todo: Todo) => queryClient.setQueryData(['todos', todo.id], todo))
		},
	})
}

const useAll = () =>
	useTodosQuery((data: [Todo]) =>
		data
			.map((todo) => ({ ...todo, created_at: new Date(todo.created_at), updated_at: new Date(todo.created_at) }))
			.sort((a: any, b: any) => a.created_at - b.created_at)
	)

const useComplete = () =>
	useTodosQuery((data: [Todo]) =>
		data
			.filter((todo) => todo.completed)
			.map((todo) => ({ ...todo, created_at: new Date(todo.created_at), updated_at: new Date(todo.created_at) }))
			.sort((a: any, b: any) => a.created_at - b.created_at)
	)

const useIncomplete = () =>
	useTodosQuery((data: [Todo]) =>
		data
			.filter((todo) => !todo.completed)
			.map((todo) => ({ ...todo, created_at: new Date(todo.created_at), updated_at: new Date(todo.created_at) }))
			.sort((a: any, b: any) => a.created_at - b.created_at)
	)

useTodosQuery.all = useAll
useTodosQuery.complete = useComplete
useTodosQuery.incomplete = useIncomplete
export default useTodosQuery
