class ChatChannel < ApplicationCable::Channel
  def subscribed
    room = Room.find_by(name: params[:id])
    stream_for room
  end
end