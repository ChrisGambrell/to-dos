Rails.application.routes.draw do
  resources :users
  scope 'api/v1' do
    post '/auth/login', to: 'authentication#login'
    get '/auth/verify', to: 'authentication#verify'
    resources :todos, param: :todo_id
    resources :users, param: :user_id
  end
end
