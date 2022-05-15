class ApplicationController < ActionController::API
    def logged_in
        header = request.headers['Authorization']
        header = header.split(' ').last if header

        begin
            @decoded = JsonWebToken.decode(header)
            @authed_user = User.find(@decoded[:user][:id])
        rescue ActiveRecord::RecordNotFound => e
            render json: { errors: [e.message] }, status: :unauthorized
        rescue JWT::DecodeError => e
            render json: { errors: [e.message] }, status: :unauthorized
        end
    end

    def todo_owner
        begin
            if @todo.user_id != @authed_user.id
                render json: { errors: ['Unauthorized'] }, status: :unauthorized
            end
        rescue ActiveRecord::RecordNotFound => e
            render json: { errors: [e.message] }, status: :unauthorized
        end
    end
end
