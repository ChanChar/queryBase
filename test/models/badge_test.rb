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

require 'test_helper'

class BadgeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
