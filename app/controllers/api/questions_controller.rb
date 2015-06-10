module Api
  class QuestionsController < ApiController
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
      @questions = Question.all
      # render json: @questions
      render :index
    end

    def show
      @question = Question.includes(:answers, :comments, answers: :comments)
                  .find(params[:id])

      # TODO: make show available to all but also pass info if user is owner
      if @question.belongs_to?(current_user)
        render :show
      else
        render json: ["You aren't the creator of this question."], status: 403
      end
    end

    private

    def question_params
      params.require(:question).permit(:title)
    end
  end
end
