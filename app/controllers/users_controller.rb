class UsersController < ApplicationController
  def new
  end

  def index
    if params[:searchParams]
      @users = User.includes(:questions, :answers, :comments, :votes)
               .where('LOWER(username) LIKE (?)', "%#{params[:searchParams].downcase}%")
               .page(params[:page])
    else
      @users = User.includes(:questions, :answers, :comments, :votes)
               .page(params[:page])
    end

    render 'api/users/index.json.jbuilder'
  end

  def show
    @user = User.includes(:questions, :answers, :comments, :votes)
            .find(params[:id])
    award_badges
    render 'api/users/show.json.jbuilder'
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      @user.owned_badges.create(badge_id: 1)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      @user = User.includes(:questions, :answers, :comments, :votes)
              .find(params[:id])
      award_badges
      render 'api/users/show.json.jbuilder'
    else
      render json: @user.errors.full_messages,
             status: :unprocessable_entity
    end

  end

  def award_badges
    Badge.all.each do |badge|
      if badge.value <= @user.points && !@user.badges.include?(badge)
        @user.owned_badges.create(badge_id: badge.id)
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :username, :image_url)
  end
end
