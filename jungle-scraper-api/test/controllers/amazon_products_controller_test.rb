require 'test_helper'

class AmazonProductsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get amazon_products_index_url
    assert_response :success
  end

end
