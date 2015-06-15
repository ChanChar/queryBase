# == Schema Information
#
# Table name: badges
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :text             not null
#  image_url   :string
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Badge < ActiveRecord::Base
  validates :title, :description, presence: true
  belongs_to :user, class_name: 'User', foreign_key: :user_id
end
