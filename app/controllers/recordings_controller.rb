class RecordingsController < ApplicationController
  def index
    room = Room.find_by(name: session[:room_id])
    recordings = Recording.where(room: room)
    render json: recordings, include: [:user]
  end

  def create
    @user = User.find_by(name: session[:user_id])
    @room = Room.find_by(name: session[:room_id])
    @recording = Recording.new(
      user: @user,
      room: @room,
      data: params[:recording_data],
    )
    if @recording.save!
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
