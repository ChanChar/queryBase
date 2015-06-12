module Api
  class CommentsController < ApiController
    def create
      @commentable = find_commentable
      @comment = @commentable.comments.build(comment_params)
      @comment.commenter_id = current_user.id

      if @comment.save
        render json: @comment
      else
        render json: @comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @comment = Comment.find(params[:id])
      @comment.destroy
      render json: {}
    end

    # how to update polymorphic instances?
    # def update
    #   @comment = current_user.comments.find(params[:id])
    #
    #   if @comment.update_attributes(comment_params)
    #     render json: @comment
    #   else
    #     render json: @comment.errors.full_messages, status: :unprocessable_entity
    #   end
    # end

    private

    def comment_params
      params.require(:comment).permit(:body, :question_id, :answer_id)
    end

    def find_commentable
      params.each do |name, value|
        if name =~ /(.+)_id$/
          return $1.classify.constantize.find(value)
        end
      end
      nil
    end
  end
end
