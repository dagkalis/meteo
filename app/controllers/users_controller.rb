class UsersController < ApplicationController
  skip_before_action :authenticate_user!#, only: [:create]
  def create
    user = User.new(
      email: params["user"]["email"],
      password: params["user"]["password"],
      password_confirmation: params["user"]["password_confirmation"]
    )

    if user.save
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: user
      }
    else
      render json: user.errors.full_messages, status: 422
    end
  end

  def update
    if params[:password_only]
      change_password
      return
    end
    user = current_user
    if user.update(user_params)
      Log.d :updated
      render json: "ok", status: 200
    else
      Log.d :not_updated
      render json: user.errors.full_messages, status: 422
    end
  end

  def change_password
    user = current_user.try(:authenticate, params["old_password"])
    if user
      if user.update(change_password_params)
        Log.d :updated_password
        render json: "ok", status: 200
      else
        Log.d :not_updated_password
        render json: user.errors.full_messages, status: 422
      end
    else
      render json: "Wrong old password. Please try again", status: 422
    end
  end

  def current_user_data
    # Log.d @current_user.attributes.except('id', 'password_digest')
    render json: @current_user.attributes
                              .except('password_digest', 'resume')
                              .merge('resume_url' => "#{request.base_url}/users/user_resume")
  end

  def user_resume
    send_data current_user.resume, filename: current_user.resume_name
  end

  def user_params
    params.permit(:email, :resume_data)
  end

  def change_password_params
    params.permit(:password, :password_confirmation)
  end

  # def user_password_params
  #   params.require(:user).permit()
  # end
    
end