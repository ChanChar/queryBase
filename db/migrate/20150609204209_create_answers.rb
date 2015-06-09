class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.integer :question_id, null: false
      t.integer :answerer_id, null: false
      t.integer :points, null: false, default: 0
      t.boolean :best, null: false, default: false

      t.timestamps null: false
    end

    add_index :answers, :question_id
    add_index :answers, :answerer_id
  end
end
