class Buyer < ApplicationRecord
  belongs_to :agent
  serialize :cities, Array

  def self.my_homes(id, cities)
  select('p.id, price, city, street, sq_ft')
  .joins("INNER JOIN agents a ON a.id = buyers.agent_id
          INNER JOIN properties p ON p.agent_id = a.id AND p.price <= buyers.max_price
          INNER JOIN addresses ad ON ad.property_id = p.id AND city = ANY ('{#{cities.join(',')}}')")
  .where('buyers.id = ? AND p.sold <> TRUE', id)
  .order('price DESC')
 end
 
end
