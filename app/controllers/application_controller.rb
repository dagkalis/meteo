class ApplicationController < ActionController::API
  # skip_before_action :verify_authenticity_token
  include CurrentUserConcern
  before_action :authenticate_user!

  def authenticate_user!
    # reset_session
    if !@current_user
      Log.d "unauthorized"
      render json: "Please login first", status: 401
    elsif !current_user.resume_name
      render json: "Please update your resume first", status: 403
    end
  end
end
