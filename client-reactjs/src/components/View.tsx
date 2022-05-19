import { ReactNode } from 'react'

const View = ({ children }: { children?: ReactNode }) => (
	<div className='flex justify-center'>
		<div className='flex flex-col w-1/2 m-4 p-4 border border-gray-200 rounded-lg shadow-lg bg-gray-50'>{children}</div>
	</div>
)

const Header = ({ children }: { children?: ReactNode }) => <div className='mb-4 text-4xl font-bold'>{children}</div>
const Content = ({ children }: { children?: ReactNode }) => <div>{children}</div>

View.Header = Header
View.Content = Content

export default View
