class UsersController < ApplicationController

  def new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      p 'here in save'
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      p 'here in errors'
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
