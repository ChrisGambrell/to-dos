# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

user1 = User.create(name: 'George Washington', email: 'gwashington@wh.gov', password: 'password', photo_url: 'https://www.whitehouse.gov/wp-content/uploads/2021/01/01_george_washington.jpg?resize=350,265')
user2 = User.create(name: 'John Adams', email: 'jadams@wh.gov', password: 'password', photo_url: 'https://www.whitehouse.gov/wp-content/uploads/2021/01/02_john_adams.jpg?resize=350,265')

todo1 = Todo.create(body: "First to-do!", completed: false, user_id: user1.id)
todo2 = Todo.create(body: "Second to-do, but completed!", completed: true, user_id: user1.id)
