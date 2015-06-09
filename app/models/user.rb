class User < ActiveRecord::Base
  attr_reader :password

  validates :email, :session_token, presence: true
  validates :password, length: { minumum: 5, allow_nil: true }
  validates :email, uniqueness: true

  after_initialize :ensure_session_token

  def self.find_by_credentials(user_params)
    user = User.find_by_email(user_params[:email])
    user.is_password?(user_params[:password]) ? user : nil
  end

  def correct_password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    session_token
  end

  private

  def generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end
end
