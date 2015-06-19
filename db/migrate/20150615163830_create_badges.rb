class CreateBadges < ActiveRecord::Migration
  def change
    create_table :badges do |t|
      t.integer :value, null: false
      t.string :title, null: false
      t.text :description, null: false
      t.string :image_url

      t.timestamps null: false
    end
  end
end
