class OwnedbadgesController < ApplicationController

  def create
    @badge = current_user.owned_badges.create(badge_params)
    render json: @badge
  end

  private

  def badge_params
    params.require(:badge).permit(:badge_id)
  end

end
