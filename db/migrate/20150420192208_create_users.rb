class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :browserid_email


      t.timestamps null: false
    end
  end
end
