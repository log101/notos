include SecureRandom

class RoomsController < ApplicationController
  # Oda bilgisini sun
  def get
    @room = Room.find_by(name: session[:room_id])
    # Eğer ortam değişkeninde bir oda yoksa yeni bir oda oluştur
    # ve bu odaya rastgele bir sayı ata
    if @room.nil?
      @new_room = Room.new(name: SecureRandom.random_number(10 ** 16))
      if @new_room.save
        session[:room_id] = @new_room.name
        render json: {
          room_id: session[:room_id]
        }
      else
        render json: {
          alert: "Couldn't create room!",
          room_id: 0
        }
      end
    else
      render json: {
        room_id: @room.name
      }
    end
  end

  # Oda numarasını değiştir
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
