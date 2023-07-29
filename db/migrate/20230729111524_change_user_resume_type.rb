class ChangeUserResumeType < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :resume, :binary
  end
end
