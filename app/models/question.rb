# == Schema Information
#
# Table name: questions
#
#  id          :integer          not null, primary key
#  asker_id    :integer          not null
#  title       :string           not null
#  description :string
#  answered    :boolean          default(FALSE), not null
#  votes       :integer          default(0), not null
#  views       :integer          default(0), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Question < ActiveRecord::Base
  validates :asker_id, :title, :answered, :votes, :views, presence: true

  belongs_to :asker, class_name: 'User', foreign_key: :asker_id
  has_many :answers, class_name: 'Answer',
                     foreign_key: :question_id,
                     dependent: :destroy

  def belongs_to?(user)
    user.id == asker_id
  end
end
