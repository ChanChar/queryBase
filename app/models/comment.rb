# == Schema Information
#
# Table name: comments
#
#  id               :integer          not null, primary key
#  commenter_id     :integer
#  body             :string
#  commentable_id   :integer
#  commentable_type :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Comment < ActiveRecord::Base
  validates :commenter_id, :commentable_type, :commentable_id, :body,
            presence: true

  belongs_to :commentable, polymorphic: true
  belongs_to :commenter, class_name: 'User', foreign_key: 'commenter_id'
end
