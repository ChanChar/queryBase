# == Schema Information
#
# Table name: questions
#
#  id          :integer          not null, primary key
#  asker_id    :integer          not null
#  title       :string           not null
#  description :text
#  answered    :boolean          default(FALSE), not null
#  votes       :integer          default(0), not null
#  views       :integer          default(0), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Question < ActiveRecord::Base
  validates :asker_id, :title, :views, presence: true

  belongs_to :asker, class_name: 'User', foreign_key: :asker_id
  has_many :comments, as: :commentable
  has_many :tags, as: :taggable
  has_many :votes, as: :votable

  has_many :answers, class_name: 'Answer',
                     foreign_key: :question_id,
                     dependent: :destroy

  def belongs_to?(user)
    user.id == asker_id
  end

  def score
    votes.inject(0) { |total, vote| total + vote.value }
  end
end
