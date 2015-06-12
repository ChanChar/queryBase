# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  attr_reader :password

  validates :email, :session_token, presence: true
  validates :password, length: { minimum: 5, allow_nil: true }
  validates :email, uniqueness: true

  has_many :questions, class_name: 'Question', foreign_key: :asker_id
  has_many :answers, class_name: 'Answer', foreign_key: :answerer_id
  has_many :comments, class_name: 'Comment', foreign_key: :commenter_id

  has_many :votes, class_name: 'Vote', foreign_key: :voter_id

  # Double check to see if this works
  has_many :question_votes, through: :votes, source: :votable
  has_many :answer_votes, through: :votes, source: :votable

  after_initialize :ensure_session_token

  def self.find_by_credentials(user_params)
    user = User.find_by_email(user_params[:email])
    return nil if user.nil?
    user.correct_password?(user_params[:password]) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def correct_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    session_token
  end

  def generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  #  Optimize votes later
  # Returns a hash of questions that the user has voted on.
  # def voted_questions
  #   zipped_votes = votes.pluck(:question_id).zip(votes)
  #   votes_hash = {}
  #
  #   zipped_votes.each do |(id, vote)|
  #     votes_hash[id] = vote
  #   end
  #
  #   votes_hash
  # end
  #
  # def voted_answers
  #   zipped_answers = votes.pluck(:answer_id).zip(votes)
  #   votes_hash = {}
  #
  #   zipped_answers.each do |(id, vote)|
  #     votes_hash[id] = vote
  #   end
  #
  #   votes_hash
  # end

  private

  def ensure_session_token
    self.session_token ||= generate_session_token
  end
end
