class CreateAmazonProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :amazon_products do |t|
      t.string :asin
      t.integer :number_of_reviews
      t.float :average_rating
      t.string :dimensions

      t.timestamps
    end
  end
end
