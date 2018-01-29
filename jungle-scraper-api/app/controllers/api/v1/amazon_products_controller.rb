require 'open-uri'
module Api::V1
  class AmazonProductsController < ApplicationController
    def index
      @amazon_products = AmazonProduct.order("created_at DESC")
      render json: @amazon_products
    end

    def create
      amazon_scrape
      render json: @amazon_product
    end

    def destroy
      @amazonProduct = AmazonProduct.find(params[:id])
      if @amazonProduct.destroy
        head :no_content, status: :ok
      else
        render json: @amazon_product.erros, status: :unprocessable_entity
      end
    end

    private

    def amazon_scrape
      search = params[:search][:search][:asin].upcase
      url = "https://www.amazon.com/dp/#{search}"
      doc = Nokogiri::HTML(open(url))

      average_rating  = doc.css("span#acrPopover").text.split(' ').first.gsub(/[^\d^\.]/, '').to_f
      number_of_reviews = (doc.css("span#acrCustomerReviewText").text.split(' ').first.gsub(/[,]/, '')).to_i
      dimensions = doc.text.match(/^(.*?)\ inches/).to_s
      extra_string = dimensions.to_s.match(/^\D+/).to_s
      dimensions.slice!(extra_string)

      @amazon_product = AmazonProduct.create(asin: search, number_of_reviews: number_of_reviews, average_rating: average_rating, dimensions: dimensions)
    end

    def amazon_product_params
      params.require(:amazon_product).permit(:asin, :number_of_reviews, :average_rating, :dimensions)
    end
  end
end
