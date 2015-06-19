# == Schema Information
#
# Table name: badges
#
#  id          :integer          not null, primary key
#  value       :integer          not null
#  title       :string           not null
#  description :text             not null
#  image_url   :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Badge < ActiveRecord::Base
  validates :title, :description, presence: true
  has_many :awarded_badges, class_name: 'Ownedbadge', foreign_key: :badge_id
  has_many :awarded_users, through: :awarded_badges, source: :owner
end
