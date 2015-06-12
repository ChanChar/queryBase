class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :voter_id
      t.integer :value
      t.references :votable, polymorphic: true, index: true

      t.timestamps null: false
    end

    add_index :votes, :voter_id
  end
end
