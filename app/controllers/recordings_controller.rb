# Kullanıcı giriş çıkış yapmakla uğraşmasın diye kullanıcı ve oda bilgileri
# Ortam değişkeni olarak tutuluyor, buna session değişkeni üzerinden erişebiliyoruz
class RecordingsController < ApplicationController
  # Kayıtları kullanıcıya ver
  def index
    room = Room.find_by(name: session[:room_id])
    recordings = Recording.where(room: room)
    # Veritabanındaki kayıtları json olarak kullanıcıya sun
    render json: recordings, include: [:user]
  end

  # Yeni kayıt oluştur
  def create
    @user = User.find_by(name: session[:user_id])
    @room = Room.find_by(name: session[:room_id])
    @recording = Recording.new(
      user: @user,
      room: @room,
      data: params[:recording_data],
    )
    if @recording.save!
      # Kayıt başarılıysa bunu WebSocket üzerinden odaya abone olmuş herkese ilet
      ChatChannel.broadcast_to(@room, {
        data: @recording.data,
        user_id: @recording.user_id,
        room_id: @recording.room_id,
        created_at: @recording.created_at,
        updated_at: @recording.updated_at,
        user: @user
      })
      render json: {
        code: 0,
        alert: "Sent successfully",
      }
    else
      render json: {
        code: -1,
        alert: "Couldn't sent the recording!",
      }
    end
  end

  def destroy
  end
end
