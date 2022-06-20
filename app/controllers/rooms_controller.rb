include SecureRandom

class RoomsController < ApplicationController
  def get
    if not session[:room_id]
      room = Room.new(name: SecureRandom.random_number(10 ** 16))
      if room.save()
        session[:room_id] = room.name
      end
    end
    render json: {
      room_id: session[:room_id]
    }
  end

  def set
    if params[:room_id]
      room = Room.find_by(name: params[:room_id])
      if room
        session[:room_id] = room.name
        render json: {
          room_id: session[:room_id]
        }
      else
        render json: {
          alert: "Room not found!",
          room_id: session[:room_id]
        }
      end
    end
  end

end
