interface User {
	id: number
	name: string
	photo_url: string
	email: string
	password_digest: string
	created_at: Date
	updated_at: Date
}

export default User
