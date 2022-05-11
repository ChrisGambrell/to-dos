import { useTodos } from './hooks'

function App() {
	const { data: todos = [] } = useTodos.all()

	return <div>hello, world</div>
}

export default App
