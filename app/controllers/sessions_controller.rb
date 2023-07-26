class SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]

  def create
    user = User.find_by(email: params["user"]["email"]).try(:authenticate, params["user"]["password"])

    if user
      session[:user_id] = user.id
      Log.d :added_to_session
      render json: {
        status: :created,
        logged_in: true,
        user: user
      }
    else
      Log.d :failed_login
      render json: { status: 401 }
    end
  end

  # def logged_in
  #   Log.d :checking_log_in
  #   if @current_user
  #     Log.d :logged_in
  #     render json: {
  #       logged_in: true,
  #       user: @current_user
  #     }
  #   else
  #     Log.d :NOT_logged_in
  #     render json: {
  #       logged_in: false
  #     }
  #   end
  # end

  def logout
    reset_session
    render json: {
      status: 200,
      logged_out: true
    }
  end
end