# == Schema Information
#
# Table name: answers
#
#  id          :integer          not null, primary key
#  question_id :integer          not null
#  answerer_id :integer          not null
#  points      :integer          default(0), not null
#  best        :boolean          default(FALSE), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Answer < ActiveRecord::Base
  validates :question_id, :answerer_id, :points, :best, presence: true

  belongs_to :answerer, class_name: 'User', foreign_key: :answerer_id
  belongs_to :question, class_name: 'Question', foreign_key: :question_id

  has_many :comments, as: :commentable

end
