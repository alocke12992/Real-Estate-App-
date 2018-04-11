class Api::PropertySearchController < ApplicationController
  
  def available
    binding.pry
    send_response(Property.search.available(q: params[:query], p: @page))
  end 
end
