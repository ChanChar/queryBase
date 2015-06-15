class CreateBadges < ActiveRecord::Migration
  def change
    create_table :badges do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :image_url
      t.integer :user_id

      t.timestamps null: false
    end

    add_index :badges, :user_id
  end
end
