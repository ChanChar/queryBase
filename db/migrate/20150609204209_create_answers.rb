class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.integer :question_id, null: false
      t.integer :answerer_id, null: false
      t.boolean :best, default: false
      t.text :body, null: false

      t.timestamps null: false
    end

    add_index :answers, :question_id
    add_index :answers, :answerer_id
  end
end
