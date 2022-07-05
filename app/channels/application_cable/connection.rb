module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private
    def find_verified_user
      room = Room.find_by(name: cookies.encrypted['_notos_session']['room_id'])
      if user = User.find_by(name: cookies.encrypted['_notos_session']['user_id'], room: room)
        user
      else
        reject_unauthorized_connection
      end
    end
  end
end
