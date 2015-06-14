class UsersController < ApplicationController
  def new
  end

  def index
    @users = User.includes(:questions, :answers, :comments, :votes).all
    render 'api/users/index.json.jbuilder'
  end

  def show
    @user = User.includes(:questions, :answers, :comments, :votes)
            .find(params[:id])
    render 'api/users/show.json.jbuilder'
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
