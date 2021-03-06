# == Schema Information
#
# Table name: answers
#
#  id          :integer          not null, primary key
#  question_id :integer          not null
#  answerer_id :integer          not null
#  best        :boolean          default(FALSE)
#  body        :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Answer < ActiveRecord::Base
  validates :question_id, :body, :answerer_id, presence: true

  belongs_to :answerer, class_name: 'User', foreign_key: :answerer_id
  belongs_to :question, class_name: 'Question', foreign_key: :question_id

  has_many :comments, as: :commentable, dependent: :destroy
  has_many :votes, as: :votable, dependent: :destroy

  def score
    votes.sum(:value)
  end
end
