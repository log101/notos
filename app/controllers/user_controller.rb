class UserController < ApplicationController
  def get
    render json: {
      user_id: session[:user_id]
    }
  end

  def set
    if params[:user_id]
      session[:user_id] = params[:user_id]
    end
    render json: {
      user_id: session[:user_id]
    }
  end
end
