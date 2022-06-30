include SecureRandom

# If there is no room_id session variable set one
# users cannot create rooms they are automatically created
class RoomsController < ApplicationController
  def get
    if session[:room_id]
      room = Room.find_by(name: session[:room_id])
      render json: {
        room_id: room.name
      }
    else
      room = Room.new(name: SecureRandom.random_number(10 ** 16))
      if room.save
        session[:room_id] = room.name
        render json: {
          room_id: session[:room_id]
        }
      else
        render json: {
          alert: "Couldn't create room!",
          room_id: 0
        }
      end
    end
  end

  def set
    if params[:room_id]
      room = Room.find_by!(name: session[:room_id])
      user = User.find_by!(name: session[:user_id], room: room)
      new_room = Room.find_by!(name: params[:room_id])
      user.update!(room: new_room)
      if room
        session[:room_id] = new_room.name
        render json: {
          alert: "Room successfully changed!",
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
