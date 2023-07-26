# if Rails.env == "production"
#   Rails.application.config.session_store :cookie_store, key: "_authentication_app", domain: "https://link-to-your-production-app.com/"
# else
#   Rails.application.config.session_store :cookie_store, key: "_authentication_app"
# end


Rails.application.config.session_store :cookie_store, :key => '_authentication_app', :domain => :all, :same_site => :none, :secure => :true, :tld_length => 2