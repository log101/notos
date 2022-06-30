class ChnageNameFromRooms < ActiveRecord::Migration[6.1]
    def change
      change_column :rooms, :name, :bigint
    end
end
