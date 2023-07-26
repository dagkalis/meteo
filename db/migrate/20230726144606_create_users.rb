class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.text :resume
      t.float :longitude
      t.float :latitude

      t.timestamps
    end
  end
end
