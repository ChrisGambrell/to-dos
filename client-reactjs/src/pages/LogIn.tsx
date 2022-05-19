import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { View } from '../components'
import { useLogIn } from '../hooks'

const LogIn = () => {
	const navigate = useNavigate()

	const logIn = useLogIn().mutateAsync

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogIn = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			await logIn({ data: { email, password } })
			navigate('/')
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<View>
			<View.Header>Log In</View.Header>
			<View.Content>
				<form className='flex flex-col space-y-2' onSubmit={handleLogIn}>
					<div className='flex items-center space-x-2'>
						<div>Email:</div>
						<input
							className='w-full px-2 py-1 rounded-md border border-gray-300'
							type='text'
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='flex items-center space-x-2'>
						<div>Password:</div>
						<input
							className='w-full px-2 py-1 rounded-md border border-gray-300'
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className='flex justify-end space-x-2'>
						<button className='px-6 py-1 rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-gray-100'>
							Log In
						</button>
					</div>
				</form>
			</View.Content>
		</View>
	)
}

export default LogIn
