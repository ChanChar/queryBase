class CreateOwnedbadges < ActiveRecord::Migration
  def change
    create_table :ownedbadges do |t|
      t.integer :owner_id, null: false
      t.integer :badge_id, null: false

      t.timestamps null: false
    end

    add_index :ownedbadges, :owner_id
    add_index :ownedbadges, :badge_id
  end
end
