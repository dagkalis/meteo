class DeleteBooks < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :longitude
    remove_column :users, :latitude
  end
end
