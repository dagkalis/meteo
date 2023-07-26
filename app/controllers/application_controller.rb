class ApplicationController < ActionController::API
  # skip_before_action :verify_authenticity_token
  include CurrentUserConcern
  before_action :authenticate_user!

  def authenticate_user!
    if !@current_user
      Log.d "unauthorized"
      render json: "Unauthorized", status: 401
    end
  end
end
