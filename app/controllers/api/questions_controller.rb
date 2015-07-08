module Api
  class QuestionsController < ApiController
    before_action :require_login

    def create
      @question = current_user.questions.new(question_params)

      if @question.save
        render json: @question
      else
        render json: @question.errors.full_messages,
               status: :unprocessable_entity
      end
    end

    def destroy
      @question = current_user.questions.find(params[:id])
      @question.try(:destroy)
      render json: {}
    end

    def index
      if params[:tag_id]
        @questions = Question.includes(:votes, :asker, :tags)
                     .where('tags.id = ?', params[:tag_id]).joins(:tags)
                     .page(params[:page])
      elsif params[:asker_id]
        @questions = Question.includes(:votes, :asker, :tags)
                     .where('asker_id = ?', params[:asker_id]).joins(:asker)
                     .page(params[:page])
      elsif params[:searchParams]
        @questions = Question.includes(:votes, :asker, :votes, :tags)
                     .where('LOWER(title) LIKE (?)', "%#{params[:searchParams].downcase}%") # LOWER() read more about this later
                     .page(params[:page])
      else
        @questions = Question.includes(:votes, :asker, :tags)
                     .page(params[:page])
      end

      render :index
    end

    def show
      @question = Question.includes(
        :asker, :tags, :votes, :answers, :comments,
        answers: :comments, answers: :votes).find(params[:id])
      @vote = @question.votes.find_by(voter_id: current_user.id)
      # @tags = @question.tags
      render :show
    end

    def update
      @question = current_user.questions.find(params[:id])
      if @question.update(question_params)
        render json: @question
      else
        render json: @question.errors.full_messages,
               status: :unprocessable_entity
      end
    end

    private

    def question_params
      params.require(:question).permit(:title, :description, :views, :tag_list)
    end
  end
end
