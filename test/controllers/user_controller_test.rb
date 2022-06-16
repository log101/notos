require "test_helper"

class UserControllerTest < ActionDispatch::IntegrationTest
  test "should get edit" do
    get user_edit_url
    assert_response :success
  end
end
