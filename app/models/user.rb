class User < ApplicationRecord
  has_secure_password
  validates_presence_of :email
  validates_uniqueness_of :email

  def resume_data=(data)
    self.resume = data.read
    self.resume_name = data.original_filename
  end

  # validates :password, length: { minimum: 4 }, if: :password_required?
  # validates :password_confirmation, length: { minimum: 4 }, if: :password_required?

  # def password_required?
  #   Log.d "password_required?" => new_record? || password.present? || password_confirmation.present?
  #   new_record? || password.present? || password_confirmation.present?
  # end


end
