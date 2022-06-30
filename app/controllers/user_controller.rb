include SecureRandom

class UserController < ApplicationController
  def get
    if session[:user_id]
      user = User.find_by(name: session[:user_id])
      render json: {
        user_id: user.name
      }
    else
      session[:user_id] = SecureRandom.base36
      room = Room.find_by(name: session[:room_id])
      puts session[:room_id]
      user = User.new(name: session[:user_id], room_id: room.id)
      user.save!
      render json: {
        user_id: session[:user_id]
      }
    end
  end

  def set
    if params[:user_id]
      user = User.find_by!(name: session[:user_id])
      if user.update(name: params[:user_id])
        session[:user_id] = params[:user_id]
        render json: {
          alert: "Username successfully changed!",
          user_id: session[:user_id]
        }
      else
        render json: {
          alert: "Error while changing username",
          user_id: session[:user_id]
        }
      end
    end
  end
end