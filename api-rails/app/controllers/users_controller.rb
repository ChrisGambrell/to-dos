class UsersController < ApplicationController
  before_action :logged_in, except: %i[ create ]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @authed_user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @authed_user.update(user_params)
      render json: @authed_user
    else
      render json: @authed_user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @authed_user.destroy
  end

  private
    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:name, :photo_url, :email, :password)
    end
end
