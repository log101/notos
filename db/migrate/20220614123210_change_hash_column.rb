class ChangeHashColumn < ActiveRecord::Migration[6.1]
  def change
    remove_column :rooms, :hash, :string
    add_column :rooms, :hash, :integer
  end
end
