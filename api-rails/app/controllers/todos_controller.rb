class TodosController < ApplicationController
  before_action :set_todo, only: %i[ show update destroy ]
  before_action :logged_in
  before_action :todo_owner, only: %i[ show update destroy ]

  # GET /todos
  def index
    # @todos = Todo.filter_by_user_id(@authed_user.id)
    @todos = Todo.where(:user_id => @authed_user.id).sort

    render json: @todos
  end

  # GET /todos/1
  def show
    render json: @todo
  end

  # POST /todos
  def create
    @todo = Todo.new(todo_params)
    @todo.user_id = @authed_user.id

    if @todo.save
      render json: @todo, status: :created, location: @todo
    else
      render json: { errors: @todo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todos/1
  def update
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: { errors: @todo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /todos/1
  def destroy
    @todo.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = Todo.find(params[:todo_id])
    end

    # Only allow a list of trusted parameters through.
    def todo_params
      params.permit(:body, :completed)
    end
end
