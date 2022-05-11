import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'
import { Todo } from '../models/Todo'

const useTodosQuery = (select: any) => {
	const queryClient = useQueryClient()

	return useQuery('todos', () => axios.get(BASE_URL + '/todos/').then((res) => res.data), {
		select,
		onSuccess: (todos = []) => {
			todos.map((todo: Todo) => queryClient.setQueryData(['todos', todo.id], todo))
		},
	})
}

const all = () =>
	useTodosQuery((data: [Todo]) =>
		data
			.map((todo) => ({ ...todo, created_at: new Date(todo.created_at), updated_at: new Date(todo.created_at) }))
			.sort((a: any, b: any) => a.created_at - b.created_at)
	)

const complete = () =>
	useTodosQuery((data: [Todo]) =>
		data
			.filter((todo) => todo.completed)
			.map((todo) => ({ ...todo, created_at: new Date(todo.created_at), updated_at: new Date(todo.created_at) }))
			.sort((a: any, b: any) => a.created_at - b.created_at)
	)

const incomplete = () =>
	useTodosQuery((data: [Todo]) =>
		data
			.filter((todo) => !todo.completed)
			.map((todo) => ({ ...todo, created_at: new Date(todo.created_at), updated_at: new Date(todo.created_at) }))
			.sort((a: any, b: any) => a.created_at - b.created_at)
	)

useTodosQuery.all = all
useTodosQuery.complete = complete
useTodosQuery.incomplete = incomplete
export default useTodosQuery
