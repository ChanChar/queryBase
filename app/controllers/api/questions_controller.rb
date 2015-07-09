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
        @questions = Question.includes(:votes, :asker)
                     .where('tags.id = ?', params[:tag_id]).joins(:tags)
                     .page(params[:page])
      elsif params[:asker_id]
        @questions = Question.includes(:votes, :asker, :tags)
                     .where('asker_id = ?', params[:asker_id]).joins(:asker)
                     .page(params[:page])
      elsif params[:searchParams]
        @questions = Question.includes(:votes, :asker, :votes, :tags)
                     .where('LOWER(title) LIKE (?)', "%#{params[:searchParams].downcase}%")
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
      render :show
    end

    def update
      update_view_count
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
      params.require(:question).permit(:title, :description, :tag_list)
    end

    def update_view_count
      if params[:views]
        question = Question.find(params[:id])
        question.update({ views: params[:views] })
      end
    end

  end
end
