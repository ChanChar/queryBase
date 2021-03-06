class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :asker_id, null: false
      t.string :title, null: false
      t.text :description
      t.integer :views, null: false, default: 0

      t.timestamps null: false
    end

    add_index :questions, :asker_id
    add_index :questions, :title
  end
end
