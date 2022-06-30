class RemoveHashFromRooms < ActiveRecord::Migration[6.1]
  def change
    remove_column :rooms, :hash, :integer
    add_column :rooms, :name, :integer
  end
end
