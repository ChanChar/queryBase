module Api
  class VotesController < ApplicationController
    def create
      @votable = find_votable
      @vote = @votable.votes.build(vote_params)
      @vote.voter_id = current_user.id

      if @vote.save
        render json: @vote
      else
        render json: @vote.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @vote = Vote.find(params[:id])
      @vote.destroy
      render json: {}
    end

    private

    def vote_params
      params.require(:vote)
        .permit(:question_id, :answer_id, :votable_id, :votable_type, :value)
    end

    def find_votable
      params.each do |name, value|
        return $1.classify.constantize.find(value) if name =~ /(.+)_id/
      end

      nil
    end
  end
end
