class UsersController < ApplicationController
  skip_before_action :authenticate_user!#, only: [:create]
  def create
    user = User.create!(
      email: params["user"]["email"],
      password: params["user"]["password"],
      password_confirmation: params["user"]["password_confirmation"]
    )

    if user
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: user
      }
    else
      render json: { status: 500 }
    end
  end

  def update
    user = current_user
    if user.update(user_params)
      Log.d :updated
      render json: "ok", status: 200
    else
      Log.d :not_updated
      render json: { json: user.errors, status: 422 }
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
    params.permit(:email, :resume_data, :password, :password_confirmation)
  end

  # def user_password_params
  #   params.require(:user).permit()
  # end
    
end