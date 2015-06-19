# == Schema Information
#
# Table name: ownedbadges
#
#  id         :integer          not null, primary key
#  owner_id   :integer          not null
#  badge_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class OwnedbadgeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
