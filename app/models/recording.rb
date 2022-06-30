class Recording < ApplicationRecord
  validates_presence_of :user_id, :room_id

  belongs_to :user
  belongs_to :room
end
