class CreateWeatherDataHistories < ActiveRecord::Migration[6.1]
  def change
    create_table :weather_data_histories do |t|
      t.references :user, null: false, foreign_key: true
      t.text :data, null: false

      t.timestamps
    end
  end
end
