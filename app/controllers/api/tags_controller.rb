module Api
  class TagsController < ApiController
    def index
      @tags = ActsAsTaggableOn::Tag.page(params[:page])
      render :index
    end

    def show
      @tag = ActsAsTaggableOn::Tag.find(params[:id])
      @questions = Question.tagged_with(@tag).page(params[:page])
      render :show
    end
  end
end
