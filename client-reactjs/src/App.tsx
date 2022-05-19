import { ReactNode, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useVerifyAuth } from './hooks/auth'
import { LogIn, Todos } from './pages'

function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<PrivateRoute>
						<Todos />
					</PrivateRoute>
				}
			/>
			<Route path='/login' element={<LogIn />} />
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	)
}

const PrivateRoute = ({ children }: { children?: ReactNode }) => {
	const navigate = useNavigate()
	const { error } = useVerifyAuth()

	useEffect(() => {
		if (error) navigate('/login')
	}, [error])

	return <>{children}</>
}

export default App
