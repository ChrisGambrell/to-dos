class AuthenticationController < ApplicationController
    before_action :logged_in, except: :login

    def login
        @user = User.find_by_email(params[:email])
        if @user&.authenticate(params[:password])
            token = JsonWebToken.encode(user: @user.as_json)
            render json: { token: token }, status: :ok
        else
            render json: { errors: ['Unauthorized'] }, status: :unauthorized
        end
    end

    def verify
        render json: { }, status: :ok
    end

    private
    def login_params
        params.permit(:email, :password)
    end
end
