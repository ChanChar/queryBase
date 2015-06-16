module Api
  class AnswersController < ApiController
    def create
      @answer = current_user.answers.new(answer_params)

      if @answer.save
        render :create
      else
        render json: @answer.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @answer = Answer.find(params[:id])
      @answer.destroy
      render json: {}
    end

    def update
      @answer = current_user.answers.find(params[:id])

      if @answer.update_attributes(answer_params)
        render :create
      else
        render json: @answer.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

    def answer_params
      params.require(:answer).permit(:body, :question_id)
    end
  end
end
