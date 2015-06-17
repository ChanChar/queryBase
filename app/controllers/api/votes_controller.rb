module Api
  class VotesController < ApplicationController
    before_action :require_login

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

    def update
      @vote = current_user.votes.find(params[:id])

      if @vote.update(vote_params)
        render json: @vote
      else
        render json: @vote.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

    def vote_params
      params.require(:vote)
        .permit(:question_id, :answer_id, :votable_id, :votable_type, :value)
    end

    def find_votable
      params['votable_type'].constantize.find(params['votable_id'])
    end
  end
end
