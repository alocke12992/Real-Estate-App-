class CreateAddresses < ActiveRecord::Migration[5.1]
  def change
    create_table :addresses do |t|
      t.string :street
      t.string :city
      t.string :zip
      t.belongs_to :property, foreign_key: true

      t.timestamps
    end
  end
end
