module Api
  class TagsController < ApiController
    def index
      @tags = ActsAsTaggableOn::Tag.all
      render :index
    end

    def show
      @tag = ActsAsTaggableOn::Tag.find(params[:id])
      @questions = Question.tagged_with(@tag)
      render :show
    end
  end
end
