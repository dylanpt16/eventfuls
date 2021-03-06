class CreateAttendances < ActiveRecord::Migration[5.1]
  def change
    create_table :attendances do |t|
      t.integer :user_id, null: false
      t.integer :event_id, null: false

      t.timestamps
    end
    add_index :attendances, :user_id
    add_index :attendances, :event_id
  end
end
