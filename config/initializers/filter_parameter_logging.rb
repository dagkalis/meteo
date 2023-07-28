# Be sure to restart your server when you modify this file.

# Configure sensitive parameters which will be filtered from the log file.
Rails.application.config.filter_parameters += [
  :passw, :secret, :token, :_key, :crypt, :salt, :certificate, :otp, :ssn
]
Rails.application.config.filter_parameters << lambda do |k, v| # cut short too long parameters
  if k && v && v.class == String && v.length > 100
    v.replace("#{v.first(100)}...")
  end
end
