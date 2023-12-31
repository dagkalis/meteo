module CurrentUserConcern
  extend ActiveSupport::Concern

  included do
    before_action :set_current_user
  end

  def set_current_user
    # Log.d session_hash: session
    if session[:user_id]
      @current_user = User.find(session[:user_id])
    end
  end

  def current_user
    @current_user
  end
end