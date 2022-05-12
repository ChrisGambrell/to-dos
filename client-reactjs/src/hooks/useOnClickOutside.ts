import { RefObject, useEffect } from 'react'

function useOnClickOutside(ref: RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			// Do nothing if clicking ref's element or descendent elements
			let target = event.target as HTMLElement
			if ((target.tagName !== 'HTML' && (!ref.current || ref.current.contains(event.target as Node))) || target.id === 'todo-body')
				return
			handler(event)
		}
		document.addEventListener('mousedown', listener)
		document.addEventListener('touchstart', listener)

		return () => {
			document.removeEventListener('mousedown', listener)
			document.removeEventListener('touchstart', listener)
		}
	}, [ref, handler])
}

export default useOnClickOutside
