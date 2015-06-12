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
      @questions = Question.includes(:votes).all
      render :index
    end

    def show
      @question = Question.includes(:votes, :answers, :comments,
                                    answers: :comments).find(params[:id])
      @vote = @question.votes.find_by(voter_id: current_user.id)
      render :show
    end

    private

    def question_params
      # TODO: remember to add tags
      params.require(:question).permit(:title, :description)
    end
  end
end
