# == Schema Information
#
# Table name: questions
#
#  id          :integer          not null, primary key
#  asker_id    :integer          not null
#  title       :string           not null
#  description :text
#  views       :integer          default(0), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Question < ActiveRecord::Base
  validates :asker_id, :title, :views, presence: true

  belongs_to :asker, class_name: 'User', foreign_key: :asker_id
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :tags, as: :taggable, dependent: :destroy
  has_many :votes, as: :votable, dependent: :destroy

  has_many :answers, class_name: 'Answer',
                     foreign_key: :question_id,
                     dependent: :destroy

  def belongs_to?(user)
    user.id == asker_id
  end

  def score
    votes.sum(:value)
  end
end
