# == Schema Information
#
# Table name: votes
#
#  id           :integer          not null, primary key
#  voter_id     :integer
#  value        :integer
#  votable_id   :integer
#  votable_type :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Vote < ActiveRecord::Base
  validates :voter_id, :value, :votable_type, :votable_id, presence: true
  validates :voter_id, uniqueness: { scope: [:votable_id, :votable_type] }

  

  belongs_to :votable, polymorphic: true
  belongs_to :voter, class_name: 'User', foreign_key: 'voter_id'
end
