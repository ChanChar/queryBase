module Api
  class TagsController < ApiController

    def create
      @tag = Tag.new(tag_params)
    end

    def index
    end

  private

  def tag_params
  end

  end
end
