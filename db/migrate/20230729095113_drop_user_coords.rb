class DropUserCoords < ActiveRecord::Migration[6.1]
  def change
    drop_table :books
  end
end
