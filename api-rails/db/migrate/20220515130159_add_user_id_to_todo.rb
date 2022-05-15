class AddUserIdToTodo < ActiveRecord::Migration[7.0]
  def change
    # add_column :todos, :user_id, :integer
    add_reference :todos, :user, null: false, foreign_key: true
  end
end
