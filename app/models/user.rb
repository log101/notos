class User < ApplicationRecord
  belongs_to :room

  validates_presence_of :name, :room
end
