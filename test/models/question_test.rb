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

require 'test_helper'

class QuestionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
