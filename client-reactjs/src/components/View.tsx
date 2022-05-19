import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

const View = ({ children }: { children?: ReactNode }) => {
	const navigate = useNavigate()

	const handleSignOut = () => {
		window.localStorage.removeItem('authToken')
		navigate('/login')
	}

	return (
		<div className='flex flex-col items-center mt-4'>
			{window.localStorage.getItem('authToken') && (
				<div className='flex w-1/2 justify-end mr-4'>
					<div className='cursor-pointer text-sm hover:underline text-red-500 active:text-red-600' onClick={handleSignOut}>
						Sign out
					</div>
				</div>
			)}
			<div className='flex flex-col w-1/2 mx-4 mb-4 p-4 border border-gray-200 rounded-lg shadow-lg bg-gray-50'>{children}</div>
		</div>
	)
}

const Header = ({ children }: { children?: ReactNode }) => <div className='mb-4 text-4xl font-bold'>{children}</div>
const Content = ({ children }: { children?: ReactNode }) => <div>{children}</div>

View.Header = Header
View.Content = Content

export default View
