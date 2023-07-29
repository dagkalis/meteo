class ApplicationController < ActionController::API
  # skip_before_action :verify_authenticity_token
  include CurrentUserConcern
  before_action :authenticate_user!

  def authenticate_user!
    # reset_session
    if !@current_user
      Log.d "unauthorized"
      render json: "Unauthorized", status: 401
    end
    
    if !current_user.resume_name
      render json: "Missing resume", status: 403
    end
  end
end
