class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :commenter_id
      t.string :body
      t.references :commentable, polymorphic: true, index: true

      t.timestamps null: false
    end

    add_index :comments, :commenter_id
  end
end
