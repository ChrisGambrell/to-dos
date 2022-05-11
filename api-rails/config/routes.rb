Rails.application.routes.draw do
  scope 'api/v1' do
    resources :todos, param: :todo_id
  end
end
