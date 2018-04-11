class Api::AgentsController < ApplicationController
  
  def index
    render json: Agent.unsold_homes
  end

  def show
      render json: Agent.find(params[:id]).buyers
  end

end
