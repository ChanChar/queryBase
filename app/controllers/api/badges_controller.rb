module Api
  class BadgesController < ApiController
    def index
      @badges = Badge.all
      render :index
    end

    # for user show and user index item page
    def show
      @badge = current_user.badges.find(params[:id])
    end

    def create
      @badge = current_user.badges.new(badge_params)
      if @badge.save
        render json: @badge
      else
        render json: @badge.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

    def badge_params
      params.require(:badge).permit(:title, :description, :img_url)
    end
  end
end
