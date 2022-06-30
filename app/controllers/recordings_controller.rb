class RecordingsController < ApplicationController
  def index
    room = Room.find_by(name: session[:room_id])
    recordings = Recording.where(room: room)
    render json: recordings, include: [:user]
  end

  def create
    recording = Recording.new(
      user: User.find_by(name: session[:user_id]),
      room: Room.find_by(name: session[:room_id]),
      data: params[:recording_data],
    )
    if recording.save!
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
