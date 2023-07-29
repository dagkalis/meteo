class AddResumeNameToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :resume_name, :string
  end
end
